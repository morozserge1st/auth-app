import * as yup from 'yup';

export const fullName = yup.string().min(1);

export const password = yup.string().min(8).matches(/[a-z]/i).matches(/\d/);

export const email = yup.string().email();
