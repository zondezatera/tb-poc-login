import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, 
  Button, Checkbox, FormControlLabel, Paper, Alert 
} from '@mui/material';
// import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

 const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ใช้ React Query เชื่อมต่อกับ Go Backend (Echo)
//   const loginMutation = useMutation({
//     mutationFn: async (payload: any) => {
//       const response = await axios.post('http://localhost:8080/login', payload);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       // เก็บ Token และย้ายหน้า (ในอนาคต)
//       localStorage.setItem('token', data.token);
//       window.location.href = '/dashboard';
//     }
//   });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // loginMutation.mutate({ email, password });
  };

  return (
    <Container maxWidth="sm">
      <Box className="min-h-screen flex flex-col justify-center py-12">
        <Paper elevation={3} className="p-8 rounded-2xl">
          <Box className="text-center mb-8">
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              ยินดีต้อนรับ
            </Typography>
            <Typography variant="body2" color="textSecondary">
              กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูลของคุณ
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box className="space-y-4"  sx={{ '& .MuiTextField-root, & .MuiButtonBase-root': { m: 1 } }}>
              {/* {loginMutation.isError && (
                <Alert severity="error">อีเมลหรือรหัสผ่านไม่ถูกต้อง</Alert>
              )} */}
              <TextField
                fullWidth
                label="อีเมล"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="รหัสผ่าน"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                // disabled={loginMutation.isPending}
                className="py-3 font-bold"
              >
                เข้าสู่ระบบ
                {/* {loginMutation.isPending ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'} */}
              </Button>
              <Box className="mt-6 text-center">
        <Typography variant="body2" color="textSecondary">
            ยังไม่มีบัญชีผู้ใช้งาน?{' '}
            <Typography 
            component="button" 
            variant="body2" 
            color="primary" 
            className="font-bold border-none bg-transparent cursor-pointer hover:underline p-0"
            onClick={() => window.location.href = '/register'}
            >
            สมัครสมาชิกใหม่
            </Typography>
        </Typography>
        </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage