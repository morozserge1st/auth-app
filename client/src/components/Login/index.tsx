import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Container, FormHelperText, Link, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../lib/auth/useAuth';
import { fetchLogin } from '../../lib/auth';
import { LoginUser } from '../../lib/types/User';
import LoadingButton from '../LoadingButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuth, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, errors } = useForm<LoginUser>();

  useEffect(() => {
    if (isAuth) {
      history.push('/');
    }
  }, [history, isAuth]);

  const handleClick = useCallback(() => {
    history.push('/registration');
  }, [history]);

  const login = useCallback(
    async (data) => {
      setError('');
      setLoading(true);

      try {
        const user = await fetchLogin(data);

        setUser(user);
        history.push('/');
      } catch (error) {
        console.error(error);
        setError('Invalid data. Please, try again');
      } finally {
        setLoading(false);
      }
    },
    [history, setUser]
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(login)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            inputRef={register({
              required: 'Required',
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={register({
              required: 'Required'
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
          >
            Sign In
          </LoadingButton>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Link component="button" variant="body2" onClick={handleClick}>
              Don't have an account? Sign Up
            </Link>

            {error && <FormHelperText error>{error}</FormHelperText>}
          </Box>
        </form>
      </div>
    </Container>
  );
};

export default Login;
