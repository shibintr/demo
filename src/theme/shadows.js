// @mui
import { alpha } from "@mui/material/styles";
//
import palette, { WIDGET_COLORS, WIDGET_COLORS_DARK } from "./palette";

// ----------------------------------------------------------------------

const LIGHT_MODE = palette.light.grey[500];
const DARK_MODE = "#000000";

const createShadow = (color) => {
  const transparent1 = alpha(color, 0.2);
  const transparent2 = alpha(color, 0.14);
  const transparent3 = alpha(color, 0.12);
  return [
    "none",
    `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
    `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
    `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
    `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
    `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
    `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
    `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
    `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
    `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
    `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
    `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
    `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
    `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
    `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
    `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
    `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
    `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
    `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`,
  ];
};

const WIDGET_GRADIANT = {
  green: `drop-shadow(10px 10px 20px ${WIDGET_COLORS.green[300]})`,
  red: `drop-shadow(10px 10px 20px ${WIDGET_COLORS.red[300]})`,
  purple: `drop-shadow(10px 10px 20px ${WIDGET_COLORS.purple[300]})`,
  blue: `drop-shadow(10px 10px 20px ${WIDGET_COLORS.blue[300]})`,
  yellow: `drop-shadow(10px 10px 20px ${WIDGET_COLORS.yellow[300]})`,
  darkshadow: `drop-shadow(10px 10px 20px ${WIDGET_COLORS.darkshadow[300]})`,
};

const createCustomShadow = (color, isLight = true) => {
  const transparent = alpha(color, 0.16);

  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    //
    primary: `0 8px 16px 0 ${alpha(palette.light.primary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(palette.light.info.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(palette.light.secondary.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(palette.light.success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(palette.light.warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(palette.light.error.main, 0.24)}`,
    referral: `0 8px 16px 0 ${alpha(palette.light.error.main, 0.24)}`,
    //
    card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(
      color,
      0.12
    )}`,
    dialog: `-40px 40px 80px -8px ${alpha(palette.light.common.black, 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(
      color,
      0.24
    )}`,
    menuactive: `-2px 0px 4px 0px rgb(172 163 217), 0 2px 18px -4px rgb(108 77 255 / 67%)`,
    widgets: WIDGET_GRADIANT,

    referralWidget: `drop-shadow(10px 10px 20px ${
      isLight
        ? WIDGET_COLORS.darkshadow[300]
        : WIDGET_COLORS_DARK.darkshadow[300]
    })`,
  };
};

export const customShadows = {
  light: createCustomShadow(LIGHT_MODE, true),
  dark: createCustomShadow(DARK_MODE, false),
};

const shadows = {
  light: createShadow(LIGHT_MODE),
  dark: createShadow(DARK_MODE),
};

export default shadows;
