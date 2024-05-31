import { Card, TableCell, TableRow } from "@mui/material";
import { capitalCase } from "change-case";
import Scrollbar from "src/components/Scrollbar";
import DataHandlerTable from "src/components/data-handler/table";
import ParseDate from "src/components/date";
import Map from "src/components/map";
import PayoutTableItem from "src/components/payout-table-item";
import Ternary from "src/components/ternary";
import { Currency } from "src/components/with-prefix";
import getPayoutNameFromId from "src/utils/get-payout-name-from-id";
import { PAYOUT_TYPE_IDS } from "src/utils/types";

const headers = [
  "financial.payout.table.no",
  "financial.payout.table.amount",
  "financial.payout.table.payout_method",
  "financial.payout.table.payout_info",
  "financial.payout.table.status",
  "financial.payout.table.date",
];

const DataList = ({ state, rowStart }) => {
  const { data, ...dataProps } = state;

  return (
    <>
      <Card sx={{ mt: 2, pt: 1 }}>
        <Scrollbar>
          <DataHandlerTable
            name="faq-table"
            headers={headers}
            dataProps={{ ...dataProps }}
          >
            <Map
              list={data}
              render={(item, i) => {
                const paymentType = parseInt(item?.payment_type);

                return (
                  <>
                    <TableRow>
                      <TableCell>{i + rowStart}</TableCell>
                      <TableCell>
                        <Currency>{item.amount}</Currency>
                      </TableCell>
                      <TableCell>
                        {getPayoutNameFromId(item.payment_type)}
                      </TableCell>
                      <TableCell>
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
                                IBAN: {item?.userprofile?.iban}
                              </PayoutTableItem>
                              <br />
                              <PayoutTableItem>
                                SWIFT: {item?.userprofile?.swift}
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
                                  item?.userprofile?.bank_account_details
                                    ?.external_account?.account_number
                                }
                              </PayoutTableItem>
                              <br />
                              <PayoutTableItem>
                                Routing Number:
                                {
                                  item?.userprofile?.bank_account_details
                                    ?.external_account?.routing_number
                                }
                              </PayoutTableItem>
                            </TableCell>
                          }
                        />
                      </TableCell>
                      <TableCell>{capitalCase(item.status)}</TableCell>
                      <TableCell>
                        <ParseDate date={item.created_at} />
                      </TableCell>
                    </TableRow>
                  </>
                );
              }}
            />
          </DataHandlerTable>
        </Scrollbar>
      </Card>
    </>
  );
};

export default DataList;
