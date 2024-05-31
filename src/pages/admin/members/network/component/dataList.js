import { Chip, IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";
import ParseDate from "src/components/date";
import Ternary from "src/components/ternary";
import Translate from "src/components/translate";

const DataList = ({ network, handleOpenMenu, rowNumber }) => {
  const {
    id,
    username,
    email,
    created_at,
    is_turn_on_email,
    active,
    email_verified_at,
    paid_active,
    rank,
    block_type,
  } = network;

  const checkBlock = block_type === null;

  return (
    <TableRow key={id}>
      <TableCell>{rowNumber}</TableCell>
      <TableCell>
        {username}
        <Ternary
          when={!Boolean(checkBlock)}
          then={
            <Chip
              label={
                <small>
                  <b>
                    <Translate>global.blocked</Translate>
                  </b>
                </small>
              }
              size="small"
              color="warning"
              variant="outlined"
              sx={{ marginLeft: 1 }}
            />
          }
        />
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{rank.rank_name}</TableCell>
      <TableCell>{paid_active === 0 ? "No" : "Yes"}</TableCell>
      <TableCell>
        <ParseDate date={created_at} />
      </TableCell>
      <TableCell>
        <IconButton
          onClick={handleOpenMenu(
            id,
            !active,
            Boolean(is_turn_on_email),
            Boolean(email_verified_at)
          )}
          name="more-button"
        >
          <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DataList;
