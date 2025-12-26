import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest, RegisterRequest } from '../services/authService';

interface ErrorResponse {
    error: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation<any, AxiosError<ErrorResponse>, LoginRequest>({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
  });

  const registerMutation = useMutation<any, AxiosError<ErrorResponse>, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
  });

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getProfile,
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });

  const logout = () => {
    authService.logout();
    queryClient.clear();
    navigate('/login');
  };

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
