import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../lib/auth/useAuth';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    paddingRight: '1rem',
  },
}));

const Main: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();

  const handleClick = useCallback(() => {
    history.push('/logout');
  }, [history]);

  return (
    <>
      <main className={classes.main}>
        <Container>
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Welcome {user?.fullName}
          </Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            <Typography component="h2" variant="h2" align="center" className={classes.link}>
              To logout click
            </Typography>

            <Typography component={Link} variant="h2" onClick={handleClick}>
              here
            </Typography>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Main;
