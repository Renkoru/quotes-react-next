import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function PasswordField({formRegister, errors}) {
  const [showPassword, setPasswordVisibility] = useState(false);

  function handleClickShowPassword () {
    setPasswordVisibility((show) => !show);
  }

  return (
    <TextField
      id="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      error={!!errors}
      helperText={errors?.message && String(errors?.message)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">

              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...formRegister('password')}
    />
  );
}
