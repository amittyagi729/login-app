import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Grid, Box, Typography, List, ListItem, Pagination } from '@mui/material';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchUsers(value);
  };

  useEffect(() => {
    fetchUsers(page);
  }, []); // Initial fetch

  return (
    <Box >
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
              <Typography>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UsersList;
