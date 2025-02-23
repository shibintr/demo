import merge from "lodash/merge";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
// @mui
import { Box, Card, CardHeader, TextField, Typography } from "@mui/material";
//
import { BaseOptionChart } from "src/components/chart";

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2022,
    data: [{ name: "sales", data: [10, 41, 35, 151, 49, 62, 69, 91, 48] }],
  },
  {
    year: 2023,
    data: [{ name: "sales", data: [148, 91, 69, 62, 49, 51, 35, 41, 10] }],
  },
];

export default function ChartStatitics() {
  const [seriesData, setSeriesData] = useState(2023);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="subtitle2" sx={{ fontSize: "15px" }}>
            {"adminStatistics.salesOver"}
          </Typography>
        }
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              "& fieldset": { border: "0 !important" },
              "& select": {
                pl: 1,
                py: 0.5,
                pr: "24px !important",
                typography: "subtitle2",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 0.75,
                bgcolor: "background.neutral",
              },
              "& .MuiNativeSelect-icon": {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart
              type="area"
              series={item.data}
              options={chartOptions}
              height={180}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
