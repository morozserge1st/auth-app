import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Container, Link, Typography, TextField, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSingUp } from '../../lib/auth';
import { useAuth } from '../../lib/auth/useAuth';
import { User } from '../../lib/types/User';
import LoadingButton from '../LoadingButton';
import { email, fullName, password } from '../../lib/helpers/validations';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Registration: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, errors } = useForm<User>();

  useEffect(() => {
    if (isAuth) {
      history.push('/');
    }
  }, [history, isAuth]);

  const handleClick = useCallback(() => {
    history.push('/login');
  }, [history]);

  const registration = useCallback(
    async (data) => {
      setError('')
      setLoading(true);

      try {
        await fetchSingUp(data);

        history.push('/');
      } catch (error) {
        console.error(error);
        setError('Invalid data. Please, try again');
      } finally {
        setLoading(false);
      }
    },
    [history]
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(registration)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            inputRef={register({
              required: 'Required',
              validate: (value) => fullName.isValidSync(value) || 'Invalid full name. Expected a minimum of 1 characters',
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
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
              validate: (value) => email.isValidSync(value) || 'Invalid email',
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
              required: 'Required',
              validate: (value) => password.isValidSync(value) || 'Invalid password. Expected a minimum of 8 characters with at least one number and one letter',
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
            Sign Up
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

export default Registration;
