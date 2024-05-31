import { TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import ChooseProduct from "./choose-product";
import HideFromForm from "../createNew/components/hide-from-form";

const Row = ({
  productList,
  handleUpdate,
  id,
  rank_name,
  team_volume,
  package_id,
  referral_count,
  referral_package_count,
  referral_package,
  personal_volume,
  bonus_amount,
  config,
}) => {
  return (
    <TableRow>
      <TableCell>
        <TableCell>
          <StringTextField
            handleUpdate={handleUpdate(id)}
            value={rank_name}
            name="rank_name"
          />
        </TableCell>
      </TableCell>
      <HideFromForm data={config?.package_id}>
        <TableCell>
          <ChooseProduct
            productList={productList}
            name="package_id"
            value={package_id}
            onChange={handleUpdate(id)}
          />
        </TableCell>
      </HideFromForm>
      <HideFromForm data={config?.referral_count}>
        <TableCell>
          <TextField
            style={{ width: 100 }}
            onChange={handleUpdate(id)}
            value={referral_count}
            name="referral_count"
            size="small"
          />
        </TableCell>
      </HideFromForm>
      <HideFromForm data={config?.team_volume}>
        <TableCell>
          <TextField
            style={{ width: 100 }}
            onChange={handleUpdate(id)}
            value={team_volume}
            name="team_volume"
            size="small"
          />
        </TableCell>
      </HideFromForm>
      <HideFromForm data={config?.personal_volume}>
        <TableCell>
          <TextField
            style={{ width: 100 }}
            onChange={handleUpdate(id)}
            value={personal_volume}
            name="personal_volume"
            size="small"
          />
        </TableCell>
      </HideFromForm>
      <HideFromForm data={config?.referral_package}>
        <TableCell>
          <ChooseProduct
            productList={productList}
            name="referral_package"
            value={referral_package}
            onChange={handleUpdate(id)}
          />
        </TableCell>
      </HideFromForm>
      <HideFromForm data={config?.referral_package}>
        <TableCell>
          <TextField
            style={{ width: 100 }}
            onChange={handleUpdate(id)}
            value={referral_package_count}
            name="referral_package_count"
            size="small"
          />
        </TableCell>
      </HideFromForm>

      <TableCell>
        <TextField
          style={{ width: 100 }}
          onChange={handleUpdate(id)}
          value={bonus_amount}
          name="bonus_amount"
          size="small"
        />
      </TableCell>
    </TableRow>
  );
};
const StringTextField = ({ value, name, handleUpdate }) => {
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setLoading(true);
    handleUpdate(e);
  };

  return (
    <TextField
      onChange={onChange}
      size="small"
      style={{ width: 150 }}
      value={value}
      name={name}
    />
  );
};

export default Row;
