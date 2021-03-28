import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container, CircularProgress } from '@material-ui/core';
import { useAuth } from '../../lib/auth/useAuth';
import { fetchLogout } from '../../lib/auth';

const Logout: FC = () => {
  const history = useHistory();
  const { setUser } = useAuth();

  const logout = useCallback(async () => {
    setUser(null);
    try {
      await fetchLogout();
    } catch (error) {
      console.error(error);
    } finally {
      history.push('/login');
    }
  }, [history, setUser]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Container component="main" maxWidth="xs">
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" />
      </Box>
    </Container>
  );
};

export default Logout;
