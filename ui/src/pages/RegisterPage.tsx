import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { register, isRegisterLoading, registerError } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords match
    if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
        }
    if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
    }
    setPasswordError('');
      
    register({ username, email, password });
  };

  return (
    <Box 
    className="flex items-center justify-center min-h-screen"
    sx={{
        backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)',
        }
      }}
    >
    <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
    <Card className="w-full">
            <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-center font-bold">
                ลงทะเบียน
            </Typography>

            {registerError && (
                <Alert severity="error" className="mb-4">
                {registerError.response?.data?.error || 'Registration failed'}
                </Alert>
            )}
            {passwordError && (
              <Alert severity="error" className="mb-4">
                {passwordError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                margin='normal'
                />

                <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin='normal'

                />

                <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                helperText="Minimum 6 characters"
                margin='normal'

                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    error={confirmPassword !== '' && password !== confirmPassword}
                    helperText={
                        confirmPassword !== '' && password !== confirmPassword
                          ? 'รหัสผ่านไม่ตรงกัน'
                          : ''
                      }
                    margin='normal'

                />

                <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isRegisterLoading}
                className="py-3"
                >
                {isRegisterLoading ? 'กำลังสร้างบัญชี...' : 'ลงทะเบียน'}
                </Button>

                <Typography className="text-center mt-4">
                มีบัญชีแล้ว?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    เข้าสู่ระบบ
                </Link>
                </Typography>
            </form>
            </CardContent>
    </Card>
    </Container>
    </Box>

  );
}
   
   