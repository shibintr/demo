import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPaymentTypes } from "src/api/user/purchase";
import { usePurchaseData } from "../../../../../store/purchaseStore";

const useFetchPurchaseMethods = () => {
  const { product_id: productIds } = usePurchaseData() || {};
  const navigate = useNavigate();
  const { id: packageId } = useParams();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [depositWalletBalance, setDepositWalletBalance] = useState(0);
  const fetchData = async () => {
    const reqData = new FormData();
    productIds?.forEach((id) => reqData.append("product_id[]", id));
    const { status, data } = await getPaymentTypes(productIds, packageId);
    if (status) {
      setPaymentMethods(data.data);
      setDepositWalletBalance(data.depositwallet);
    }
  };

  useEffect(() => {
    if (!productIds) navigate("/user/checkout");
    else fetchData();
  }, []);
  return {
    paymentMethods,
    depositWalletBalance,
    fetchPaymentMethods: fetchData,
  };
};

export default useFetchPurchaseMethods;
