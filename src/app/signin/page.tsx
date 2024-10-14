import { Box, Stack } from "@mui/material";
import SignInForm from "./SignInForm";
// import SignUpForm from "./SignUpForm";

export default function SignIn() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{mx: "200px"}}
    >
      <Box sx={{flexGrow: 1}}>
        <SignInForm />
      </Box>
    </Stack>
  );
}
      // <Box sx={{flexGrow: 1}}>
      //   <SignUpForm />
      // </Box>
