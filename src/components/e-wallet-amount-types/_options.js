import { PLANS } from "src/CONSTANTS";

const { binary, matrix, monoLine, roi, uniLevel } = PLANS;

const options = [
  { value: "all", label: "amount_types.all" },
  { value: "referral_bonus", label: "amount_types.r_bonus" },
  {
    value: "deducted_by_admin",
    label: "amount_types.deducted_by_admin",
  },
  {
    value: "credited_by_admin",
    label: "amount_types.credited_by_admin",
  },
  { value: "fund_transfer", label: "amount_types.fund_transfer" },
  {
    plans: [roi],
    value: "roi_commission",
    label: "amount_types.roi_commission",
  },
  {
    value: "first_order_bonus",
    label: "amount_types.first_order_bonus",
  },
  {
    value: "level_commission",
    label: "amount_types.level_commission",
  },
  {
    plans: [binary, roi],
    value: "binary_bonus",
    label: "amount_types.b_bonus",
  },
  {
    value: "rank_bonus",
    label: "amount_types.rank_bonus",
  },
  {
    plans: [binary, roi],
    value: "binary_matching_bonus",
    label: "amount_types.m_bonus",
  },
];

export default options;
