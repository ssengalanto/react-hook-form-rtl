import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { useTypedController } from '@hookform/strictly-typed';

export interface SigninFormState {
  email: string;
  password: string;
}

export type UseSignForm = ReturnType<typeof useForm>;

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email field is required.')
    .email('Input must be a valid email address.'),
  password: yup
    .string()
    .required('Password field is required.')
    .min(8, 'Password must be at least 8 characters.'),
});

export const useSignForm = () => {
  const { watch, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fields = watch();

  const Controller = useTypedController<SigninFormState>({ control });

  return {
    models: { fields, errors },
    operations: { handleSubmit, reset, control },
    components: { Controller },
  };
};
