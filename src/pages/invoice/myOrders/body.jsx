import { Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import Map from "src/components/map";
import Ternary from "src/components/ternary";
import Translate from "src/components/translate";
import { Currency } from "src/components/with-prefix";

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  "& td": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const InvoiceBody = ({ invoice }) => {
  const {
    taxes,
    total_amount: totalPrice,
    discount_amount: discount,
    sub_total,
    user_payment,
  } = invoice || {};

  const isProductPurchase = useMemo(() => {
    return Boolean(user_payment?.purchase_type === "online_store");
  }, [user_payment?.purchase_type]);

  return (
    <TableBody>
      <Ternary
        when={user_payment?.purchase_type === "coupon_purchase"}
        then={
          <TableRow
            sx={{
              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <TableCell>{1}</TableCell>
            <TableCell align="left">
              <Box sx={{ maxWidth: 560 }}>
                <Typography variant="subtitle2">Coupon Purchase</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {user_payment?.payment_type?.payment_status}
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="left">
              {user_payment?.payment_type?.name}
            </TableCell>

            <TableCell align="left">
              <Currency>{user_payment?.amount}</Currency>
            </TableCell>
            <TableCell align="left"> - </TableCell>
          </TableRow>
        }
        otherwise={
          <Map
            list={user_payment?.carts}
            render={(row, index) => (
              <TableRow
                key={index}
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell align="left">
                  <Box sx={{ maxWidth: 560 }}>
                    <Typography variant="subtitle2">
                      {row?.product?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      noWrap
                    >
                      {user_payment?.payment_type?.payment_status}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  {user_payment?.payment_type?.name}
                </TableCell>

                <TableCell align="left">
                  <Currency>{row?.actual_price}</Currency>
                </TableCell>
                <TableCell align="left">
                  {row?.prices?.business_volume}
                </TableCell>
              </TableRow>
            )}
          />
        }
      />

      <RowResultStyle>
        <TableCell colSpan={3} />
        <Ternary
          when={isProductPurchase}
          then={
            <>
              <TableCell align="right">
                <Box sx={{ mt: 2 }} />
                <Typography>
                  <Translate>
                    user.online_store.my_orders.invoice_details.sub_total
                  </Translate>
                </Typography>
              </TableCell>
              <TableCell align="right" width={120}>
                <Box sx={{ mt: 2 }} />
                <Typography>
                  <Currency>{sub_total}</Currency>
                </Typography>
              </TableCell>
            </>
          }
        />
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={3} />
        <TableCell align="right">
          <Typography>
            <Translate>
              user.online_store.my_orders.invoice_details.discount
            </Translate>
          </Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Typography sx={{ color: "error.main" }}>
            <Currency>{discount}</Currency>
          </Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={3} />
        <TableCell align="right">
          <Typography>
            <Translate>
              user.online_store.my_orders.invoice_details.taxes
            </Translate>
          </Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Typography>
            <Currency>{(taxes && taxes) || 0}</Currency>
          </Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={3} />
        <TableCell align="right">
          <Typography variant="h6">
            <Translate>
              user.online_store.my_orders.invoice_details.total
            </Translate>
          </Typography>
        </TableCell>
        <TableCell align="right" width={140}>
          <Typography variant="h6">
            <Currency>{totalPrice}</Currency>
          </Typography>
        </TableCell>
      </RowResultStyle>
    </TableBody>
  );
};

export default InvoiceBody;
