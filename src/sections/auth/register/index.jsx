import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import LoadingScreen from "src/components/LoadingScreen";
import Password from "src/components/Password";
import ChoosePlan from "src/components/choose-plan";
import Countries from "src/components/countries";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import Map from "src/components/map";
import Translate from "src/components/translate";
import GoogleOAuthButton from "src/pages/auth/components/google-login";
import TermAndConditions from "./components/term-and-conditions";
import useFields from "./hooks/use-fields";
import useRegister from "./hooks/use-register";

const options = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];

const ChooseGender = ({ name, label }) => {
  return (
    <RHFSelect label={label} name={name}>
      <option value="" />
      <Map
        list={options}
        render={({ label, value }) => <option value={value}>{label}</option>}
      />
    </RHFSelect>
  );
};

const SelectComponent = ({ type, label, name }) => {
  switch (type) {
    case "password": {
      return <Password label={label} name={name} />;
    }
    case "date": {
      return <RHFDatePicker label={label} name={name} />;
    }

    case "gender": {
      return <ChooseGender label={label} name={name} />;
    }
    case "country": {
      return <Countries label={label} name={name} />;
    }

    default:
      return <RHFTextField type={type} label={label} name={name} />;
  }
};

const RegisterForm = () => {
  const { methods, onSubmit } = useRegister();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const fields = useFields();

  if (fields.length < 1) return <LoadingScreen />;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Map
          list={fields}
          render={({ input_label, input_type, input_name }) => (
            <SelectComponent
              key={input_name}
              label={input_label}
              name={input_name}
              type={input_type}
            />
          )}
        />
        {/* <RHFTextField name="email" label="register.email" />
        <RHFTextField name="username" label="register.username" /> */}
        {/* <Ternary
          when={isDobRequired}
          then={<RHFDatePicker name="date_of_birth" label="register.dob" />}
        /> */}
        {/* <Password name="password" label="register.password" /> */}

        {/* <Password name="repassword" label="register.re_enter_password" /> */}

        {/* <RHFTextField
          name="referral"
          label="register.referral"
          disabled={Boolean(uname)}
        /> */}
        <ChoosePlan />

        <TermAndConditions />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          name="register"
        >
          <Translate>register.register</Translate>
        </LoadingButton>
        <GoogleOAuthButton
          plan={methods.getValues("plan")}
          buttonLabel="register.google_register"
        />
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
