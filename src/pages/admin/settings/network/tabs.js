import { PLANS } from "src/CONSTANTS";
const { binary, matrix, roi, uniLevel, monoLine } = PLANS;
const tabs = [
  {
    value: "settings.network.binary_bonus_settings",
    icon: "clarity:list-solid-badged",
    name: "binary",
    plans: [binary, roi],
  },
  {
    value: "global.binary_matching_bonus_settings",
    icon: "tabler:binary-tree-2",
    name: "binaryMatching",
    plans: [binary, roi],
  },
  {
    value: "settings.network.rank_settings",
    icon: "fa6-solid:ranking-star",
    name: "rank",
    plans: [binary, roi, uniLevel, matrix, monoLine],
  },
  // {
  //   value: "Rank Settings Configuration",
  //   icon: "fa6-solid:ranking-star",
  //   name: "rank-configuration",
  //   plans: [binary, roi, uniLevel, matrix, monoLine],
  // },
  {
    value: "settings.network.referral_commission_settings",
    icon: "fluent-mdl2:chat-invite-friend",
    name: "referral",
    plans: [binary, roi, uniLevel, matrix, monoLine],
  },
  {
    value: "settings.network.first_order_bonus",
    icon: "ic:round-receipt",
    name: "bonus",
    plans: [binary, roi, matrix, uniLevel, monoLine],
  },
  {
    value: "settings.network.level_bonus",
    icon: "mdi:graph-line-variant",
    name: "level",
    plans: [binary, roi, matrix, uniLevel, monoLine],
  },
  {
    value: "settings.network.roi_settings",
    icon: "mdi:graph-line-variant",
    name: "roi",
    plans: [roi],
  },
  {
    value: "Stair Step Settings",
    icon: "mdi:stairs-up",
    name: "stair",
    plans: [],
  },
  {
    value: "Matrix",
    icon: "mdi:stairs-up",
    name: "matrix",
    plans: [matrix],
  },
];

export default tabs;
