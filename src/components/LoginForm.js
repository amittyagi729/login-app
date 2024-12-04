import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useLoginMutation } from '../store/api/apiSlice';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice'; // Import the login action
import { useRouter } from 'next/router';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data).unwrap();

      // Dispatch the login action with token and user data from the result
      dispatch(login({
        token: result.token,
        user: result.user,  // Ensure the result includes user data (adjust if necessary)
      }));

      // Redirect to the Dashboard page after login success
      router.push('/dashboard');
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
        Login
      </Button>
    </Box>
  );
}
