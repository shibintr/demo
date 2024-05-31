import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";

import { useTranslation } from "react-i18next";
import Translate from "src/components/translate";
import useAuth from "src/hooks/useAuth";
import Countries from "../../../../../components/countries";
import Mobile from "./components/Mobile";
import ProfilePicture from "./components/ProfilePicture";
import SocialMedia from "./components/SocialMedia";
import useUser from "./hooks/useUser";

const EditInfo = () => {
  const { methods, onSubmit } = useUser();
  const { isAdmin } = useAuth();
  const onBlur = ({ target: { value, name } }) =>
    methods.setValue(name, value.trim());

  const { t } = useTranslation();

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <ProfilePicture methods={methods} />
            <SocialMedia />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              {isAdmin ? (
                <RHFTextField
                  name="username"
                  label={"profile.username"}
                  onBlur={onBlur}
                />
              ) : null}

              <RHFTextField
                name="first_name"
                label="profile.edit.first_name"
                onBlur={onBlur}
              />
              <RHFTextField
                name="last_name"
                label="profile.edit.last_name"
                onBlur={onBlur}
              />

              <RHFSelect name="gender" label="profile.edit.gender">
                <option value="" />
                <option value="male">{t("genders.male")}</option>
                <option value="female">{t("genders.female")}</option>
                <option value="other">{t("genders.other")}</option>
              </RHFSelect>
              <Countries />

              <RHFTextField name="state" label="profile.edit.state" />
              <RHFTextField name="city" label="profile.edit.city" />
              <RHFTextField name="zipcode" label="profile.edit.pin" />
              <RHFTextField name="address" label="profile.edit.address" />
              <Mobile />

              <RHFTextField
                name="email"
                label="profile.edit.mail"
                disabled={isAdmin ? false : true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RHFTextField name="facebook" label="profile.edit.social.fb" />
              <RHFTextField name="twitter" label="profile.edit.social.x" />
              <RHFTextField
                name="whatsapp"
                type="number"
                label="profile.edit.social.whatsapp"
              />
              <RHFTextField
                name="instagram"
                label="profile.edit.social.insta"
              />
              <RHFTextField name="telegram" label="profile.edit.social.tele" />
              <RHFTextField name="medium" label="profile.edit.social.medium" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={methods.formState.isSubmitting}
                name="save"
              >
                <Translate>profile.edit.update</Translate>
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default EditInfo;
