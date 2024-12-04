import { Box, Grid } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
      <Grid container display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' minHeight='100%' sx={{marginTop:'50px'}}>
        <Box sx={{ boxShadow: 5,padding:5,borderRadius:5 }} >
            <Box textAlign='center'><h1 textAlign='center' width='100%'>Register</h1></Box>
            <RegisterForm />
        </Box>
      </Grid>
  );
}
