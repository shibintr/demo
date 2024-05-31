import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Iconify from "src/components/Iconify";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";

import ShowTwoFactorAuth from "src/components/show-two-factor-auth";
import Translate from "src/components/translate";
import {
  ProfileNotificationSettings,
  ProfilePayoutInfo,
} from "src/sections/user/profile";
import axiosInstance from "src/utils/axios";
import * as Yup from "yup";
import LocalStorageClear from "./LocalStorageClear";

const ProfileAccountSettings = () => {
  const handleErrors = useErrors();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const defaultValues = {
    password: "",
    confirmNewPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (reqdata) => {
    let data = new FormData();
    data.append("password", reqdata.password);
    data.append("_method", "PUT");
    try {
      const { status, data: responseData } = await axiosInstance({
        method: "post",
        url: "/api/profile-password",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (status === 200) {
        reset();
        enqueueSnackbar(responseData.message);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
          <Translate>{"profile.account_settings"}</Translate>
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} alignItems="flex-end">
            <RHFTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="password"
              type={showPassword ? "text" : "password"}
              label={"profile.new_passwords"}
            />
            <RHFTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowChangePassword(!showChangePassword)}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showChangePassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="confirmNewPassword"
              type={showChangePassword ? "text" : "password"}
              label={"profile.confirm_new_passwords"}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              name="account-settings"
            >
              <Translate>{"profile.save_changes"}</Translate>
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
      <ProfilePayoutInfo />
      <ShowTwoFactorAuth>
        <ProfileNotificationSettings />
      </ShowTwoFactorAuth>
      <LocalStorageClear />
    </div>
  );
};

export default ProfileAccountSettings;
