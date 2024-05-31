import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grow,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Iconify from "src/components/Iconify";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Ternary from "src/components/ternary";
import Users from "src/components/users";
import useIsUser from "src/hooks/use-is-user";
import useAuth from "src/hooks/useAuth";
import axiosInstance from "src/utils/axios";
import Transition from "src/utils/dialog-animation.js";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  referral: Yup.string().required("Referral ID is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const defaultValues = {
  referral: "",
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AddUser = ({ onClose, addUser, fetchTreeData }) => {
  const { isAdmin, user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = async (inputData) => {
    const reqData = new FormData();

    Object.entries({ ...inputData, ...addUser }).forEach(([key, value]) =>
      reqData.append(key, value)
    );
    try {
      const { status } = await axiosInstance.post(
        isAdmin ? "api/admin/genealogy" : "api/user/genealogy",
        reqData
      );

      if (status === 200) {
        onClose();
        enqueueSnackbar("Successfully created the user");
        methods.reset({ ...defaultValues, referral: user.id });
        fetchTreeData();
      }
    } catch (err) {
      Object.entries(err.errors).forEach(([k, v]) =>
        methods.setError(k, { message: v[0] })
      );
    }
  };

  const {
    setValue,
    formState: { isSubmitting },
  } = methods;
  const isUser = useIsUser();
  useEffect(() => {
    if (isUser) {
      setValue("referral", user.id);
    }
  }, [isUser, user]);

  const { t } = useTranslation();

  return (
    <Dialog
      open={addUser.status}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <DialogTitle>Add User</DialogTitle>

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <Ternary
              when={isUser}
              then={
                <TextField
                  value={user.username}
                  label={t("genealogy.add.referral")}
                />
              }
              otherwise={
                <Users
                  type="network"
                  name="referral"
                  label="genealogy.add.referral"
                />
              }
            />

            <RHFTextField name="username" label="genealogy.add.username" />
            <RHFTextField name="name" label="genealogy.add.first_name" />
            <RHFTextField name="email" label="genealogy.add.email" />
          </Box>

          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <RHFTextField
              name="password"
              label="genealogy.add.password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="confirmPassword"
              label="genealogy.add.confirm_password"
              type={showRePassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowRePassword(!showRePassword)}
                    >
                      <Iconify
                        icon={
                          showRePassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus name="close" color="error">
            Close
          </Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            name="add-user"
          >
            Submit
          </LoadingButton>
          {/* <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            name="add-user"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton> */}
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AddUser;
