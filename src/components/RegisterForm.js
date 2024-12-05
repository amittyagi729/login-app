import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography } from '@mui/material';
import Link from 'next/link'; // Import Link for navigation
import { useRegisterMutation } from '../store/api/apiSlice';
import { useRouter } from 'next/router'; // Import useRouter for redirection

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerUser] = useRegisterMutation();
  const router = useRouter(); // Initialize router for navigation

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data).unwrap();
      alert(`Registration successful: ${result.token}`);

      // Redirect to login page after successful registration
      router.push('/login');
    } catch (error) {
      alert(`Error: ${error.data.error}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email Field */}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email', { 
          required: 'Email is required', 
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: 'Please enter a valid email address',
          }
        })}
        error={!!errors.email} // Display error if email is invalid or missing
        helperText={errors.email?.message} // Show error message
      />

      {/* Password Field */}
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: 'Password must contain at least one letter, one number, and one special character',
          },
        })}
        error={!!errors.password} // Display error if password is invalid or missing
        helperText={errors.password?.message} // Show error message
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>

      {/* Already Registered Link */}
      <Typography variant="body2" align="center" marginTop={2}>
        Already registered?{' '}
        <Link href="/login" passHref>
          <Typography 
            component="span" 
            color="primary" 
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Login here
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
}