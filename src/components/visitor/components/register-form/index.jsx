import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import addVisitor from "src/api/global";
import { FormProvider } from "src/components/hook-form";
import Ternary from "src/components/ternary";
import { object, ref, string } from "yup";
import Icons from "../icons";
import InputField from "./input-field";

const schema = object().shape({
  first_name: string().required("First Name is required"),
  last_name: string().required("Last Name is required"),
  email: string()
    .email("errors.register.email.email")
    .required("errors.register.email.required"),

  password: string()
    .min(8, "errors.register.password.min")
    .required("errors.register.password.required"),
  confirm_password: string().oneOf(
    [ref("password"), null],
    "errors.register.repassword.oneOf"
  ),
});

const defaultValues = {
  first_name: "",
  last_name: "",
  password: "12345678",
  confirm_password: "12345678",
  email: "",
  // skype: "",
  // whatsapp: "",
  // telegram: "",
  // type: "",
  // message: "",
};

const RegisterForm = ({ setUserId, setShowOtp }) => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { enqueueSnackbar } = useSnackbar();
  const {
    setError,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (inputData) => {
    const { status, message, data, err } = await addVisitor(inputData);
    if (status) {
      setUserId(data.id);
      enqueueSnackbar(message);
      setShowOtp(true);
      return;
    }
    Object.entries(err.response.data).forEach(([k, v]) => {
      setError(k, { message: v });
    });
  };

  const { breakpoints } = useTheme();
  const d_md = useMediaQuery(breakpoints.down("md"));

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack justifyContent="center" height="100%">
        <Box>
          <InputField />
          <LoadingButton
            loading={isSubmitting}
            fullWidth
            type="submit"
            variant="contained"
            name="message"
          >
            Get OTP
          </LoadingButton>

          <Ternary
            when={d_md}
            then={
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Icons color="#000" mt={0} mb={0} />
              </Box>
            }
          />
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
