import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Image from "src/components/Image";
import Loop from "src/components/loop";
import Ternary from "src/components/ternary";
import {
  Currency,
  useGetCurrencySymbol,
  useGetExchangeRate,
} from "src/components/with-prefix";
import fetchUser from "src/utils/fetchUser";
import { twoPlaceRound } from "src/utils/round";
import { load, useCartDispatch } from "../../store/cartStore";
import {
  changeSubscription,
  usePurchaseDispatch,
} from "../../store/purchaseStore";
import { fetchCart } from "./hooks/useCartList";

const updateSubscription = async (data) => {
  const reqData = new FormData();
  const { id, ...rest } = data;
  Object.entries(rest).forEach(([k, v]) => reqData.append(k, v));
  reqData.append("_method", "PUT");
  try {
    const { status } = await fetchUser.post(`cart/${id}`, reqData);
    return status === 200;
  } catch (err) {
    return false;
  }
};

const Item = ({ item, removeFromCart }) => {
  const {
    id,
    price,
    product,
    price_id,
    is_gift,
    special_product_price,
    special_product,
    product_id,
    actual_price,
  } = item;

  const { name } = product || {};
  const [subscription, setSubscription] = useState({
    id: "",
    price: "",
    product_id: "",
  });
  const prices = special_product
    ? special_product?.special_product_price
    : product.product_prices;
  const cartDispatch = useCartDispatch();
  const dispatch = usePurchaseDispatch();

  const onSubscriptionChange = async (v) => {
    const data = JSON.parse(v);
    const reqObject = {
      id,
      product_id: product_id,
    };
    if (data.special_product_id) {
      reqObject.special_product_id = data?.special_product_id;
      reqObject.special_product_price_id = data.id;
    } else {
      reqObject.price_id = data.id;
    }
    const status = await updateSubscription(reqObject);
    if (status) {
      const newCart = await fetchCart();
      cartDispatch(load(newCart));
      dispatch(
        changeSubscription({
          priceId: data.id,
          productId: product_id,
          prevPrice: subscription.id,
        })
      );
    }
    setSubscription(data);
  };

  const priceId = special_product_price ? special_product_price?.id : price_id;

  return (
    <TableRow key={id}>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            alt="product image"
            src={item.product.product_images.find(Boolean)?.image_url}
            sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
          />
          <Box>
            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
              {name}
            </Typography>
            <Ternary
              when={is_gift}
              then={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "#ef6c00" }}
                    >
                      ( Buy as gift for {item.friend_email} )
                    </Typography>
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Box>
      </TableCell>

      <TableCell align="left">
        <Currency>{actual_price}</Currency>
      </TableCell>

      <TableCell align="center">
        <Ternary
          when={product?.is_package}
          then={
            <Typography>
              <Currency>{prices?.find(Boolean)?.price}</Currency>
            </Typography>
          }
          otherwise={
            <Subscriptions
              priceId={priceId}
              isPackage={Boolean(product?.is_package)}
              prices={prices}
              onChange={onSubscriptionChange}
              special_product_id={special_product_price?.special_product_id}
            />
          }
        />
      </TableCell>

      <TableCell align="right">
        <IconButton onClick={() => removeFromCart(id)}>
          <Iconify icon={"eva:trash-2-outline"} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const Subscriptions = ({ prices, onChange, priceId, special_product_id }) => {
  const { id } = prices?.find(({ id }) => id === priceId) || {};
  const selected = special_product_id
    ? JSON.stringify({ id, special_product_id })
    : JSON.stringify({ id });

  const symbol = useGetCurrencySymbol();

  const exchangeRate = useGetExchangeRate();

  return (
    <>
      <Box sx={{ textAlign: "right" }}>
        <TextField
          label="Select Month"
          select
          sx={{ maxWidth: "75%" }}
          fullWidth
          size="small"
          SelectProps={{ native: true }}
          InputLabelProps={{
            shrink: true,
          }}
          FormHelperTextProps={{
            sx: {
              textAlign: "right",
              margin: 0,
              mt: 1,
              marginLeft: 2,
              width: "80%",
            },
          }}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          <Loop
            list={prices}
            render={({
              price,
              validity,
              id,
              package_label,
              special_product_id,
            }) => (
              <option
                value={
                  special_product_id
                    ? JSON.stringify({ id, special_product_id })
                    : JSON.stringify({ id })
                }
                key={id}
              >
                {symbol}
                {twoPlaceRound(exchangeRate * price)} (
                {package_label ? package_label : validity})
              </option>
            )}
          />
        </TextField>
      </Box>
    </>
  );
};

export default Item;
