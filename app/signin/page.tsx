"use client";

import React, { useState } from 'react';
import { Box, Button, Container, Link, Stack, TextField, Typography, Paper, Alert } from '@mui/material';
import { signIn } from 'next-auth/react'; // Import signIn from next-auth

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState('admin@lumiverse.com'); // Default email
  const [password, setPassword] = useState('admin'); // Default password
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: username,
      password: password,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      setError(null);
      // Redirect to the dashboard or home page after successful sign-in
      window.location.href = '/'; // Replace with your dashboard route
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          sx={{
            width: '50%',
            display: { xs: 'none', md: 'block' },
            textAlign: 'center',
            px: 4,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Hi, Welcome back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            More effectively with optimized workflows.
          </Typography>
          <Box mt={4}>
            <img src="/Security.gif" alt="Illustration" style={{ maxWidth: '100%' }} />
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            maxWidth: '400px',
            mx: 'auto',
            p: { xs: 3, sm: 4 },
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Sign in to your account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Don't have an account? <Link href="/signup" color="primary">Get started</Link>
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                textTransform: 'none',
                padding: '10px 0',
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default SignInPage;
