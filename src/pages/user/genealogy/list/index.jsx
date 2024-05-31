import { Box, Card, TableCell, TableRow } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";

import DataHandlerTable from "src/components/data-handler/table";
import ParseDate from "src/components/date";
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import { PATH_DASHBOARD } from "src/routes/paths";
import useGetList from "./hooks/use-get-list";

const headers = [
  "genealogy.list.table.no",
  "genealogy.list.table.u_name",
  "genealogy.list.table.doj",
  "genealogy.list.table.level",
];

const List = () => {
  const { state, ...rest } = useGetList();

  const { data, ...dataProps } = state;

  return (
    <Page title="genealogy.list.title">
      <Box>
        <HeaderBreadcrumbs
          heading="genealogy.list.title"
          links={[
            { name: "global.dashboard", href: PATH_DASHBOARD.root },
            { name: "genealogy.list.title" },
          ]}
        />
        <Card sx={{ pt: 1 }}>
          <DataHandlerTable headers={headers} dataProps={dataProps}>
            <Map
              list={data}
              render={({ username, DOJ, level }, i) => {
                return (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{username}</TableCell>
                    <TableCell>
                      <ParseDate date={DOJ} />
                    </TableCell>
                    <TableCell>{level}</TableCell>
                  </TableRow>
                );
              }}
            />
          </DataHandlerTable>
        </Card>
      </Box>
      <PaginationButtons {...rest} />
    </Page>
  );
};

export default List;
