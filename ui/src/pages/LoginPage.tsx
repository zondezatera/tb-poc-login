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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoginLoading, loginError } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Box 
    className="min-h-screen flex items-center justify-center"
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
        <Card className="w-full" >
          <CardContent className="p-8">
            <Typography variant="h4" className="mb-6 text-center font-bold">
              เข้าสู่ระบบ
            </Typography>

            {loginError && (
              <Alert severity="error" className="mb-4">
                {loginError.response?.data?.error || 'เข้าสู่ระบบล้มเหลว'}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" >
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoginLoading}
                className="py-3"
              >
                {isLoginLoading ? 'กำลังเข้าระบบ...' : 'ลงชื่อเข้าใช้งาน'}
              </Button>

              <Typography className="text-center mt-12">
                ยังไม่มีบัญชีผู้ใช้งาน?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  สมัครสมาชิกใหม่
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
    </Container>
    </Box>
  );
}
