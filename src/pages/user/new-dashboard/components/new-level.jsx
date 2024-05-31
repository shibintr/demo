import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import Ternary from "src/components/ternary";
import useAuth from "src/hooks/useAuth";

import Bronze from "src/images/bronze.png";
import NewLevelIcon from "src/images/rank-achieve.png";
import Silver from "src/images/silver.png";

const NewLevel = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { user } = useAuth();
  const { rank } = user;

  return (
    <Box
      sx={{
        pt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "310px",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={NewLevelIcon} style={{ width: "100px" }} />
      </Box>

      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography
          sx={{ color: theme.palette.primary.main, fontSize: "15px" }}
        >
          {t("user_dashboard.nextlevelTitle")}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.widgets.tertiary[400],
            fontSize: "13px",
            fontWeight: "300",
          }}
        >
          {t("user_dashboard.nextlevelSubTitle")}
        </Typography>
      </Box>

      <Box
        sx={{
          border: `1px solid ${theme.palette.widgets.border[300]}`,
          px: { xl: 3, xs: 1 },
          py: 2,
          borderRadius: "12px",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontWeight: "300",
            mb: 1,
            color: theme.palette.widgets.tertiary[600],
            lineHeight: "1.1",
            fontSize: { xl: "14px", xs: "13px" },
          }}
        >
          <span style={{ width: "85px", float: "left", textAlign: "right" }}>
            {t("user_dashboard.currentrank")}:
          </span>
          <span style={{ float: "left" }}>
            <img src={Bronze} style={{ width: "16px", margin: "0 4px" }} />
          </span>
          <span style={{ fontWeight: "400" }}>{rank?.rank_name}</span>
        </Box>
        <Ternary
          when={rank?.next_rank}
          then={
            <Box
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontWeight: "300",
                color: theme.palette.widgets.tertiary[600],
                lineHeight: "1.1",
                fontSize: { xl: "14px", xs: "13px" },
              }}
            >
              <span
                style={{ width: "85px", float: "left", textAlign: "right" }}
              >
                {" "}
                {t("user_dashboard.nextrank")}:
              </span>

              <span style={{ float: "left" }}>
                <img src={Silver} style={{ width: "16px", margin: "0 4px" }} />
              </span>
              <span style={{ fontWeight: "400" }}>{rank?.next_rank}</span>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default NewLevel;
