import * as React from 'react';
import { alpha, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';

interface ApiResponse {
  emails: string[];
  isValidPhone: boolean;
  names: string[];
  phone: string;
  more_phones: string[];
  facebook_profiles: string[];
}

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [data, setData] = React.useState<ApiResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/api20/lookup?token=77078d21-79ef-439b-8ae6-9efc9726475a&phone=${phoneNumber}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result: ApiResponse[] = await response.json();
      setData(result[0]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Discover How Others Save You
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Enter your number and see how your contacts have saved your name.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter Mobile Number"
              placeholder="Mobile Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter Mobile Number',
              }}
            />
            <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
              Start
            </Button>
          </Stack>
        </Stack>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {data && (
          <Paper sx={{ width: '100%', mt: 3, borderRadius: '8px', p: 2 }}>
            <Typography variant="h6" color='#074786' fontWeight='bold' gutterBottom>
              Names people have saved your number as:
            </Typography>
            <List>
              {data.names.map((name, index) => (
                <ListItem key={index}>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" color='#074786' fontWeight='bold' gutterBottom>
              Your Phone Numbers:
            </Typography>
            <List>
              <ListItem>
                <IconButton aria-label="call" href={`tel:${data.phone}`}>
                  <PhoneIcon />
                </IconButton>
                <ListItemText primary={`Primary: ${data.phone}`} />
              </ListItem>
              {data.more_phones.map((phone, index) => (
                <ListItem key={index}>
                  <IconButton aria-label="call" href={`tel:${phone}`}>
                    <PhoneIcon />
                  </IconButton>
                  <ListItemText primary={`Other: ${phone}`} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" color='#074786' fontWeight='bold' gutterBottom>
              Social Media Profiles:
            </Typography>
            <List>
              {data.facebook_profiles.map((profile, index) => (
                <ListItem key={index}>
                  <IconButton aria-label="visit" href={profile} target="_blank" rel="noopener">
                    <FacebookIcon />
                  </IconButton>
                  <Link href={profile} target="_blank" rel="noopener">
                    Facebook Profile
                  </Link>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
