import { Grid, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', textAlign: 'center' }}
    >
      <Grid item xs={10} sm={6}>
        <Typography variant="h3" gutterBottom>
          Welcome to the App
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please register or log in to access the dashboard.
        </Typography>
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/register')}
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
