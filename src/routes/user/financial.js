import { lazy } from "react";
import { Navigate } from "react-router";
import Loadable from "../Loadable";

const FundTransfer = Loadable(
  lazy(() => import("src/pages/user/financial/fundTransfer"))
);

const EWallet = Loadable(
  lazy(() => import("src/pages/user/financial/ewallet"))
);

const DepositWallet = Loadable(
  lazy(() => import("src/pages/user/financial/deposit"))
);

const AddCredit = Loadable(
  lazy(() => import("src/pages/user/financial/deposit/addCredit"))
);

const RequestPayout = Loadable(
  lazy(() => import("src/pages/user/financial/requestPayout/index"))
);

const financial = {
  path: "financial",
  children: [
    { index: true, element: <Navigate to="e-wallet" /> },
    { path: "e-wallet", element: <EWallet /> },
    {
      path: "deposit-wallet",
      children: [
        { index: true, element: <DepositWallet /> },
        { path: "add-credit", element: <AddCredit /> },
      ],
    },
    { path: "funds-transfer", element: <FundTransfer /> },
    { path: "payout", element: <RequestPayout /> },
  ],
};

export default financial;
