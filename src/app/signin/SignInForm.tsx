"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from "zod";
import PasswordField from './PasswordField';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import { Google } from '@mui/icons-material';

const schema = z.object({
  identifier: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, ...rest },
  } = useForm({resolver: zodResolver(schema)});

  async function onSubmit(formData: FieldValues) {
    signIn("credentials", {...formData, redirectTo: "/" });
  }
  
  async function onGoogleSignin(formData: FieldValues) {
    signIn("google", { redirectTo: "/" });

  }

  // <Typography variant="h5" component="div" align="center" sx={{mb: 2}}>Sign In</Typography>
  return (
    <>
      <Button
        sx={{width: "100%"}}
        variant="outlined"
        startIcon={<Google/>}
        onClick={onGoogleSignin}
      >
        Google Sign In
      </Button>

      <Divider sx={{my: "20px"}}>OR</Divider>
      
      <form onSubmit={handleSubmit(onSubmit)} id="sign-in-form">
        <Stack spacing={2}>
          <TextField
            id="identifier"
            label="Email address"
            error={!!errors.identifier}
            helperText={errors.identifier?.message && String(errors.identifier?.message)}
            {...register('identifier')}
          />
          <PasswordField errors={errors.password} formRegister={register} />

          <Button type="submit" form="sign-in-form" variant="outlined">Sign In</Button>
        </Stack>
      </form>
    </>
  );
}
