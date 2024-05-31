import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import Map from "src/components/map";
import Ternary from "src/components/ternary";

import Translate from "src/components/translate";
import useGetPaymentTypes from "./hooks/use-get-payment-types";

const PaymentMethods = () => {
  const { loading, onSubmit, methods, updateMethods, updateRecurring } =
    useGetPaymentTypes();

  const selectedAtLeastOne = useMemo(
    () => Boolean(methods.reduce((acc, { active }) => acc || active, 0)),
    [methods]
  );

  return (
    <Box>
      <Card sx={{ p: 2, minHeight: "300px" }}>
        <Typography variant="h6" gutterBottom mb={5}>
          <Translate>network_members.choose_payments</Translate>
        </Typography>

        <Ternary
          when={methods.length === 0}
          then={
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          }
          otherwise={
            <>
              <FormGroup>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    width: { xl: "60%", lg: "75%", xs: "100%" },
                  }}
                >
                  <Map
                    list={methods}
                    render={({ name, active, id, is_recurring, image }) => {
                      return (
                        <Grid item sm={6} xs={12}>
                          <Paper
                            variant="outlined"
                            sx={{
                              p: 1.5,
                              height: 100,
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={1.5}
                              justifyContent="space-between"
                            >
                              <Stack>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onClick={updateMethods(id)}
                                      checked={active}
                                    />
                                  }
                                  label={name}
                                />

                                <Ternary
                                  when={is_recurring !== null}
                                  then={
                                    <FormControlLabel
                                      sx={{
                                        ml: 3,
                                      }}
                                      labelPlacement="start"
                                      control={
                                        <Switch
                                          onClick={updateRecurring(id)}
                                          checked={is_recurring}
                                        />
                                      }
                                      label={
                                        <Translate>
                                          global.enable_recurring
                                        </Translate>
                                      }
                                    />
                                  }
                                />
                              </Stack>
                              <Box>
                                <img src={image} />
                              </Box>
                            </Stack>
                          </Paper>
                        </Grid>
                      );
                    }}
                  />
                </Grid>
              </FormGroup>
              <LoadingButton
                sx={{
                  mt: 2,
                }}
                disabled={!selectedAtLeastOne}
                variant="contained"
                onClick={onSubmit}
                loading={loading}
              >
                <Translate>network_members.update</Translate>
              </LoadingButton>
            </>
          }
        />
      </Card>
    </Box>
  );
};

export default PaymentMethods;
