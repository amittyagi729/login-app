import { useState, useEffect } from 'react';
import { useGetUsersQuery } from '../store/api/apiSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Grid, Typography, CircularProgress, Card, CardContent, Drawer, AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Divider, useMediaQuery } from '@mui/material';
import { SettingsApplications as SettingsApplicationsIcon, AccountBox as AccountBoxIcon, Dashboard as DashboardIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice'; // Assuming a logout action exists

export default function Dashboard() {
  const [open, setOpen] = useState(true); // Sidebar state
  const { data, error, isLoading } = useGetUsersQuery();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)'); // Detect if the screen is small (mobile)

  // Set initial sidebar state based on screen size
  useEffect(() => {
    if (isMobile) {
      setOpen(false); // Sidebar is hidden on mobile by default
    } else {
      setOpen(true); // Sidebar is open on larger screens
    }
  }, [isMobile]); // Re-run when screen size changes

  // Ensure router is used only on the client side by checking if window is defined
  useEffect(() => {
    if (!auth.token) {
      router.push('/login');
    }
  }, [auth.token, router]); // Dependency array ensures useEffect runs when auth.token changes

  // Toggle sidebar
  const toggleSidebar = () => setOpen(!open);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  // Prevent rendering the dashboard if we're on the server side or redirecting
  if (!auth.token) {
    return <div>Redirecting...</div>; // Optional: Show a loading or redirect message
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: open ? 240 : 0, // Sidebar width when open or closed
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 0,
            transition: 'width 0.3s',
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'} // Temporary for mobile, persistent for larger screens
        anchor="left"
        open={open}
        onClose={toggleSidebar} // Close sidebar on mobile when clicking outside
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
          <Typography variant="h6" sx={{ display: open ? 'block' : 'none' }}>Dashboard</Typography>
          <IconButton onClick={toggleSidebar}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button>
           <DashboardIcon/> 
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
          <AccountBoxIcon/>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
          <SettingsApplicationsIcon/>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
            <ExitToAppIcon />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s',
          padding:'0',
        }}
      >
        {/* AppBar */}
        <AppBar position="sticky">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome, {auth.user?.first_name}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Typography variant="h4" gutterBottom sx={{ marginTop: '20px' }}>
          Dashboard
        </Typography>

        {/* Loader while fetching users */}
        {isLoading && <CircularProgress />}

        {/* Error message */}
        {error && <Typography color="error">Error fetching users</Typography>}

        {/* Users list */}
        {data && (
          <Grid container spacing={3}>
            {data.data.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
