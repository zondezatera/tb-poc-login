import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
  } from '@mui/material';
  import { useAuth } from '@/hooks/useAuth';
  
  export default function DashboardPage() {
    const { user, logout } = useAuth();

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
            <CardContent>
            <Typography variant="h4" className="mb-4">
                Welcome, {user?.username}!
            </Typography>

            <Box className="space-y-2">
                <Typography>
                <strong>Email:</strong> {user?.email}
                </Typography>
                <Typography>
                <strong>User ID:</strong> {user?.id}
                </Typography>
                <Typography>
                <strong>Member since:</strong>{' '}
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </Typography>
            </Box>
            <div className='text-center'>
                <Button  variant="outlined" onClick={logout}>Logout</Button>
            </div>
            </CardContent>
        </Card>
        </Container>
      </Box>
    );
  }
  