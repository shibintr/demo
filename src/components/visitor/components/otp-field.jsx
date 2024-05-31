import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import visitorServer from "src/utils/visitor";

const OtpField = ({ id, setDataCollected, setOpen }) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      id: "",
      otp: "",
    },
  });

  const {
    setError,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (id) {
      setValue("id", id);
    }
  }, [id]);
  const onSubmit = handleSubmit(async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).map(([k, v]) => reqData.append(k, v));

    try {
      const { data } = await visitorServer.post("/user-verification", reqData);
      localStorage.setItem("data-collected", true);
      setDataCollected(true);
      setOpen(false);
      enqueueSnackbar(data.message);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });

      Object.entries(err.errors).forEach(([k, v]) => {
        setError(k, { message: v });
      });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack justifyContent="center" height="100%">
        <Stack spacing={2}>
          <RHFTextField label="Enter OTP" name="otp" />
          <LoadingButton
            fullWidth
            variant="contained"
            type="submit"
            loading={isSubmitting}
          >
            Verify
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default OtpField;
