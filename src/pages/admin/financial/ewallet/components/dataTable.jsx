import { Card, Divider, TableCell, TableRow } from "@mui/material";
import Scrollbar from "src/components/Scrollbar";
import DataHandlerTable from "src/components/data-handler/table";
import ParseDate from "src/components/date";
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import { Currency } from "src/components/with-prefix";
import useFilter from "../../shared/hooks/use-filter";
import useFetchEWallet from "../hooks/useFetchEWallet";
import DataFilter from "./filter";

const headers = [
  "financial.e_wallet.table.no",
  "financial.e_wallet.table.user_name",
  "financial.e_wallet.table.from",
  "financial.e_wallet.table.amount_type",
  "financial.e_wallet.table.payment_type",
  "financial.e_wallet.table.amount",
  "financial.e_wallet.table.date",
];

const DataTable = () => {
  const methods = useFilter();
  const filter = methods.watch();
  const { state, fetchData, rowStart, ...rest } = useFetchEWallet(filter);
  const { data, ...dataProps } = state;

  const onFilter = methods.handleSubmit(async (inputData) => {
    await fetchData(1, inputData);
  });
  return (
    <>
      <Card>
        <DataFilter methods={methods} onFilter={onFilter} isWallet="ewallet" />
        <Scrollbar>
          <DataHandlerTable
            name="faq-table"
            headers={headers}
            dataProps={dataProps}
          >
            <Map
              list={data}
              render={(item, i) => (
                <>
                  <TableRow key={item.id}>
                    <TableCell>{i + rowStart}</TableCell>
                    <TableCell>{item.user?.username}</TableCell>
                    <TableCell>{item.from_user?.username}</TableCell>
                    <TableCell>{item.payment_type}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {item.type}
                    </TableCell>
                    <TableCell>
                      <Currency>{item.total_amount}</Currency>
                    </TableCell>
                    <TableCell>
                      <ParseDate date={item.created_at} />
                    </TableCell>
                  </TableRow>
                </>
              )}
            />
          </DataHandlerTable>
        </Scrollbar>
        <Divider />
      </Card>
      <PaginationButtons {...rest} />
    </>
  );
};

export default DataTable;
