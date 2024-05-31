import { Button } from "@mui/material";
import { useState } from "react";
import Ternary from "src/components/ternary";
import { useSubscriptionContext } from "src/pages/user/subscriptions/store/subscription";
import UpdateFinPay from "./components/update-finpay";
import UpdateStripe from "./components/update-stripe";

const UpdatePayment = ({ reload }) => {
  const data = useSubscriptionContext();

  const [purchaseId, setPurchaseId] = useState();
  const [openUpdateStripe, setOpenStripeUpdate] = useState(false);
  const [openUpdateFinPay, setOpenUpdateFinPay] = useState(false);

  const { is_recurring, id, is_stripe_recurring, is_fin_pay_recurring } = data;

  const handleClickOpenUpdate = (purchaseId) => () => {
    setPurchaseId(purchaseId);
    if (Boolean(is_stripe_recurring)) {
      setOpenStripeUpdate(true);
    } else {
      setOpenUpdateFinPay(true);
    }
  };

  const handleClose = () => {
    setOpenUpdateFinPay(false);
    setOpenStripeUpdate(false);
  };

  return (
    <>
      <Ternary
        when={is_recurring && (is_fin_pay_recurring || is_stripe_recurring)}
        then={
          <>
            <Button
              variant="outlined"
              size="small"
              color="success"
              sx={{ ml: 1 }}
              onClick={handleClickOpenUpdate(id)}
            >
              Update Card
            </Button>
            <UpdateStripe
              onClose={handleClose}
              open={openUpdateStripe}
              reload={reload}
            />
             
            <UpdateFinPay
              onClose={handleClose}
              open={openUpdateFinPay}
              purchaseId={purchaseId}
              reload={reload}
            />
          </>
        }
      />
    </>
  );
};

export default UpdatePayment;
