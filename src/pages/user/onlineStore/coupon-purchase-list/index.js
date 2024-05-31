import { Card, TableCell, TableRow } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import DataHandlerTable from "src/components/data-handler/table";
import ParseDate from "src/components/date";
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import { Currency } from "src/components/with-prefix";
import { PATH_DASHBOARD } from "src/routes/paths";
import useCouponPurchase from "./hooks/useCouponPurchase";

const headers = [
  "global.no",
  "Package",
  "Code",
  "global.total_price",
  "global.order_date",
];
const CouponList = () => {
  const { state, fetchData, rowStart, ...rest } = useCouponPurchase();
  const { data, ...dataProps } = state;
  return (
    <div>
      <Page title="coupons.user.list.title">
        <HeaderBreadcrumbs
          heading="coupons.user.list.title"
          links={[
            { name: "global.dashboard", href: PATH_DASHBOARD.root },
            { name: "coupons.user.list.title" },
          ]}
        />
        <Card sx={{ pt: 1 }}>
          <Scrollbar>
            <DataHandlerTable
              name="faq-table"
              headers={headers}
              dataProps={{ ...dataProps }}
            >
              <Map
                list={data}
                render={(row, i) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {i + rowStart}
                    </TableCell>

                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.code}</TableCell>
                    <TableCell>
                      <Currency>{row.total_amount}</Currency>
                    </TableCell>
                    <TableCell>
                      <ParseDate date={row.start_date} />
                    </TableCell>
                  </TableRow>
                )}
              />
            </DataHandlerTable>
          </Scrollbar>
        </Card>
        <PaginationButtons {...rest} />
      </Page>
    </div>
  );
};

export default CouponList;
