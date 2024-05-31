import { Backdrop, Box, Paper, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Ternary from "../ternary";
import LeftPane from "./components/left-pane";
import OtpField from "./components/otp-field";
import RegisterForm from "./components/register-form";

const Visitor = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [userId, setUserId] = useState("");
  const [dataCollected, setDataCollected] = useState(() =>
    JSON.parse(localStorage.getItem("data-collected"))
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (dataCollected) {
      body.style.overflow = "unset";
      return;
    }
    setTimeout(() => {
      body.style.overflow = "hidden";
      setOpen(true);
    }, 5000);
  }, []);
  const { breakpoints } = useTheme();

  const d_md = useMediaQuery(breakpoints.down("md"));

  return (
    <>
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Paper
          sx={{
            width: "40vw",
            maxWidth: "900px",
            minWidth: "270px",
            height: "500px",
            padding: 0.5,
          }}
          component={Stack}
          direction="row"
          spacing={3}
        >
          <Ternary when={!d_md} then={<LeftPane open={open} />} />
          <Box
            sx={{
              paddingTop: 3,
              padding: 3,
              overflowY: "auto",
              "& form": {
                height: "100%",
              },
            }}
          >
            <Ternary
              when={showOtp}
              then={
                <OtpField
                  id={userId}
                  setDataCollected={setDataCollected}
                  setOpen={setOpen}
                />
              }
              otherwise={
                <RegisterForm setShowOtp={setShowOtp} setUserId={setUserId} />
              }
            />
          </Box>
        </Paper>
      </Backdrop>
    </>
  );
};

export default Visitor;
