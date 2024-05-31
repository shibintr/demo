import {
  Button,
  Card,
  IconButton,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";

import { capitalCase } from "change-case";
import { useTranslation } from "react-i18next";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import DataHandlerTable from "src/components/data-handler/table";
import ParseDate from "src/components/date";
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import Ternary from "src/components/ternary";
import Translate from "src/components/translate";
import { Currency } from "src/components/with-prefix";
import { PATH_DASHBOARD } from "src/routes/paths";
import { isMenuActive } from "src/utils/actionProtector";
import DataFilter from "./filter";
import useFilter from "./hooks/use-filter";
import usePayment from "./hooks/use-payment";
const headers = [
  "financial.payout.admin.request.table.no",
  "global.invoice_id",
  "global.product",
  "global.total_price",
  "global.payment_status",
  "global.order_date",
];

const PendingPayments = () => {
  const methods = useFilter();

  const filter = methods.watch();
  const onFilter = methods.handleSubmit((inputData) => {
    fetchData(1, inputData);
  });
  const { state, fetchData, rowStart, ...rest } = usePayment(filter);
  const { data, ...dataProps } = state;

  const { t } = useTranslation();
  return (
    <>
      <Page title={"global.pending_payments"}>
        <HeaderBreadcrumbs
          heading="global.pending_payments"
          links={[
            { name: "global.dashboard", href: PATH_DASHBOARD.root },
            { name: "global.pending_payments" },
          ]}
        />
        <Card sx={{ pt: 1 }}>
          {/* <DataFilter onFilter={onFilter} methods={methods} /> */}
          <DataHandlerTable
            name="category-table"
            dataProps={{ ...dataProps }}
            headers={headers}
          >
            <Map
              list={data}
              render={(item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{i + rowStart}</TableCell>
                  <TableCell>{item.invoice_id}</TableCell>
                  <TableCell>
                    {item.cart.length > 1 ? (
                      <>
                        {item.cart[0]?.product.name} +{" "}
                        {item?.cart_product_count}
                      </>
                    ) : (
                      <> {item.cart[0]?.product.name}</>
                    )}
                  </TableCell>
                  <TableCell>
                    <Currency>{item?.amount}</Currency>
                  </TableCell>
                  <TableCell>
                    {capitalCase(item.payment_status) || ""}
                  </TableCell>

                  <TableCell>
                    <ParseDate date={item?.created_at} />
                  </TableCell>
                </TableRow>
              )}
            />
          </DataHandlerTable>
        </Card>
        <PaginationButtons {...rest} />
      </Page>
    </>
  );
};

export default PendingPayments;
