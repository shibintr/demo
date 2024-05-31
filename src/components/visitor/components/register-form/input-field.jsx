import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RHFTextField } from "src/components/hook-form";
import Ternary from "src/components/ternary";

const InputField = () => {
  const { breakpoints } = useTheme();
  const d_md = useMediaQuery(breakpoints.down("md"));

  return (
    <>
      <Ternary
        when={d_md}
        then={
          <>
            <Typography variant="h4">Contact Information</Typography>
            <Typography variant="caption" fontWeight={600}>
              Fill up the Form and our Team will get back to you in 24 hours.
            </Typography>
          </>
        }
      />
      <Grid sx={{ mb: 2, mt: 0.0005 }} container spacing={2}>
        <Grid item md={6} sm={12} width="100%">
          <RHFTextField
            fullWidth
            name="first_name"
            label="First Name"
            variant="standard"
            placeholder="John"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item md={6} sm={12} width="100%">
          <RHFTextField
            fullWidth
            name="last_name"
            label="Last Name"
            variant="standard"
            placeholder="Doe"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item sm={12} width="100%">
          <RHFTextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            placeholder="johndoe@cloudmlm.com"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* <Grid item md={6} sm={12} width="100%">
          <RHFTextField
            fullWidth
            name="password"
            label="Password"
            variant="standard"
            type="password"
          />
        </Grid>
        <Grid item md={6} sm={12} width="100%">
          <RHFTextField
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            variant="standard"
            type="password"
          />
        </Grid> */}
        {/* <Grid item md={6} sm={12} width="100%">
          <RHFTextField
            fullWidth
            name="whatsapp"
            label="Whatsapp"
            variant="standard"
          />
        </Grid>
        <Grid item md={6} sm={12} width="100%">
          <RHFTextField
            fullWidth
            name="telegram"
            label="Telegram"
            variant="standard"
          />
        </Grid> */}
      </Grid>
    </>
  );
};

export default InputField;
