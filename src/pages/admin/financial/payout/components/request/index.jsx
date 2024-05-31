import {
  Button,
  Card,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import Iconify from "src/components/Iconify";
import DataHandlerTable from "src/components/data-handler/table";
import ParseDate from "src/components/date";
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import PayoutTableItem from "src/components/payout-table-item";
import Ternary from "src/components/ternary";
import Translate from "src/components/translate";
import { Currency } from "src/components/with-prefix";
import { isMenuActive } from "src/utils/actionProtector";
import getPayoutNameFromId from "src/utils/get-payout-name-from-id";
import { PAYOUT_TYPE_IDS } from "src/utils/types";
import usePayout from "../../hooks/use-payout";
import useHandler from "./hooks/use-handler";

const headers = [
  "financial.payout.admin.request.table.no",
  "financial.payout.admin.request.table.user_name",
  "financial.payout.admin.request.table.user_balance",
  "financial.payout.admin.request.table.payout_method",
  "financial.payout.admin.request.table.payout_info",
  "financial.payout.admin.request.table.date",
  "financial.payout.admin.request.table.requested",
  "financial.payout.admin.request.table.admin_fee",
  "financial.payout.admin.request.table.released",
  "financial.payout.admin.request.table.action",
];

const genStatus = (gp, p) => {
  const test = isMenuActive(gp, p);
  return {
    approve: test("approve"),
    reject: test("reject"),
  };
};
const PayoutRequest = () => {
  const status = genStatus("nav.financial.title", "nav.financial.payout");

  const { fetchPayoutData, state } = usePayout();

  const { data, ...dataProps } = state;
  const { payoutData } = data;
  const { count, onChange, page, rowStart, seed } = usePagination();

  useEffect(() => {
    seed(payoutData.last_page, payoutData.from);
  }, [payoutData]);

  useEffect(() => {
    fetchPayoutData(page);
  }, [page]);

  const { approve, reject } = useHandler(() => fetchPayoutData(page));

  return (
    <>
      <Card sx={{ pt: 1 }}>
        <DataHandlerTable
          name="category-table"
          dataProps={{ ...dataProps }}
          forceEmpty={payoutData?.data?.length === 0}
          headers={headers}
        >
          <Map
            list={payoutData?.data}
            render={(item, i) => {
              const paymentType = parseInt(item?.payment_type);

              return (
                <TableRow key={item.id}>
                  <TableCell>{i + rowStart}</TableCell>
                  <TableCell>{item.user?.username}</TableCell>
                  <TableCell>
                    <Currency>{item.user_balance}</Currency>
                  </TableCell>
                  <TableCell>
                    {getPayoutNameFromId(item.payment_type)}
                  </TableCell>
                  <Ternary
                    when={paymentType === PAYOUT_TYPE_IDS.crypto}
                    then={
                      <TableCell>
                        <PayoutTableItem>
                          {item?.available_coin?.name}:{" "}
                          {item?.user_coin_address?.address}
                        </PayoutTableItem>
                      </TableCell>
                    }
                  />

                  <Ternary
                    when={paymentType === PAYOUT_TYPE_IDS.manual}
                    then={
                      <TableCell>
                        <PayoutTableItem>
                          IBAN: {item?.user_profile?.iban}
                        </PayoutTableItem>
                        <br />
                        <PayoutTableItem>
                          SWIFT: {item?.user_profile?.swift}
                        </PayoutTableItem>
                      </TableCell>
                    }
                  />

                  <Ternary
                    when={paymentType === PAYOUT_TYPE_IDS.stipe}
                    then={
                      <TableCell>
                        <PayoutTableItem>
                          Account Number:
                          {
                            item?.user_profile?.bank_account_details
                              ?.external_account?.account_number
                          }
                        </PayoutTableItem>
                        <br />
                        <PayoutTableItem>
                          Routing Number:
                          {
                            item?.user_profile?.bank_account_details
                              ?.external_account?.routing_number
                          }
                        </PayoutTableItem>
                      </TableCell>
                    }
                  />

                  <TableCell>
                    <ParseDate date={item.created_at} />
                  </TableCell>
                  <TableCell>
                    <Currency>{item.amount}</Currency>
                  </TableCell>
                  <TableCell>
                    <Currency>{item.admin_fee_deducted}</Currency>
                  </TableCell>
                  <TableCell>
                    <Currency>{item.released_amount}</Currency>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Ternary
                        when={status.approve}
                        then={
                          <Button
                            size="small"
                            onClick={approve(item.id)}
                            startIcon={<Iconify icon="akar-icons:check" />}
                            variant="contained"
                            name="payout-approve"
                          >
                            <Translate>
                              financial.payout.admin.request.approve
                            </Translate>
                          </Button>
                        }
                      />

                      <Ternary
                        when={status.reject}
                        then={
                          <Button
                            size="small"
                            onClick={reject(item.id)}
                            startIcon={
                              <Iconify icon="ant-design:delete-outlined" />
                            }
                            color="error"
                            variant="contained"
                            name="payout-reject"
                          >
                            <Translate>
                              financial.payout.admin.request.reject
                            </Translate>
                          </Button>
                        }
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            }}
          />
        </DataHandlerTable>
      </Card>
      <PaginationButtons onChange={onChange} page={page} count={count} />
    </>
  );
};

export default PayoutRequest;
