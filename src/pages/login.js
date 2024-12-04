import { Box, Grid } from '@mui/material';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <Grid container display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' height='100%' sx={{marginTop:'50px'}}>
        <Box sx={{ boxShadow: 5,padding:5,borderRadius:5 }} >
        <Box textAlign='center'><h1 textAlign='center' width='100%'>Login</h1></Box>
      <LoginForm />
      </Box>
      </Grid>
  );
}
