import { Box, Card, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import EventList from "./components/event-list";
import IncomePayoutGraph from "./components/income-payout-graph";
import MasterWidget from "./components/master-widget";
import NetworkGraph from "./components/network-graph";
import NewLevel from "./components/new-level";
import Referral from "./components/referral";
import ReferralList from "./components/referral-list";
import TeamPerformance from "./components/team-performance";
import WidgetList from "./components/widget-list";

const UserDashboard = () => {
  const { t } = useTranslation();

  return (
    <Page
      title={t("global.dashboard")}
      sx={{
        ml: {
          lg: "0px",
          xs: "16px",
        },
      }}
    >
      {/* <HeaderBreadcrumbs
        heading={t("global.dashboard")}
        links={[{ name: "global.home" }, { name: "global.dashboard" }]}
      /> */}

      <Grid container spacing={2} sx={{ p: "0 10px" }}>
        <Box
          sx={{
            pl: { lg: "10px", md: "0" },
            width: {
              xl: "calc(100% - 365px)",
              lg: "calc(100% - 295px)",
              sm: "100%",
              xs: "100%",
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item lg={8} md={12} xs={12} mt={2}>
              <MasterWidget />
            </Grid>
            <Grid item lg={4} md={6} xs={12} sx={{ mt: { lg: 2 } }}>
              <IncomePayoutGraph />
            </Grid>

            <Grid item lg={8} md={6} xs={12}>
              <NetworkGraph />
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <WidgetList />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} mt={2} xs={12}>
              <ReferralList />
            </Grid>
            <Grid item lg={6} md={6} xs={12} mt={2}>
              <TeamPerformance />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            width: { xl: "350px", lg: "280px", sm: "100%", xs: "100%" },
            ml: { lg: "15px", md: "0", sm: "0", xs: "0" },
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item lg={12} md={6} xs={12}>
              <Card mt={2} sx={{ p: "20px" }}>
                <Grid container>
                  <Grid item lg={12} md={12} xs={12}>
                    <Referral />
                  </Grid>

                  <Grid item lg={12} md={12} xs={12}>
                    <NewLevel />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item lg={12} md={6} xs={12}>
              <EventList />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* ======================== */}
    </Page>
  );
};

export default UserDashboard;
