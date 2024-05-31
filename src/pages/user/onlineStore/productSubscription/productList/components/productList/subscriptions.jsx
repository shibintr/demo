import { Button, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Iconify from "src/components/Iconify";
import Map from "src/components/map";
import Translate from "src/components/translate";
import { Currency } from "src/components/with-prefix";
import HideForPackage from "../../../../../../../components/package-or-product/hide-for-package";
import ShowForPackage from "../../../../../../../components/package-or-product/show-for-package";

const Subscriptions = ({
  price = [],
  onChange,
  prices,
  is_package,
  onBuyNow,
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      justifyContent="space-between"
    >
      <HideForPackage>
        <TextField
          label={t("user.online_store.select_month")}
          select
          sx={{ maxWidth: "75%" }}
          fullWidth
          size="small"
          SelectProps={{ native: true }}
          onChange={onChange}
          disabled={!prices.length || is_package}
        >
          <Map
            list={prices}
            render={({ id, validity, price }) => (
              <option value={JSON.stringify({ price, id })} key={id}>
                {validity} {t("global.month")}
              </option>
            )}
          />
        </TextField>
      </HideForPackage>

      <ShowForPackage>
        <Button
          variant="contained"
          onClick={onBuyNow}
          size="small"
          startIcon={<Iconify icon="icon-park-outline:buy" />}
          name="add-cart"
        >
          <Translate>user.online_store.buy_now</Translate>
        </Button>
      </ShowForPackage>

      <Stack direction="row">
        <Typography variant="subtitle1">
          <Currency>{price}</Currency>
        </Typography>
      </Stack>
    </Stack>
  );
};

Subscriptions.propTypes = {
  price: PropTypes.array.isRequired,
};

export default Subscriptions;
