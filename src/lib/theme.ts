import type { PaletteMode } from "@mui/material";
import React from "react";
import type { IThemeContext } from "../types/lib/theme";

export default function getTheme(mode: PaletteMode) {
  return {
    typography: {
      fontFamily: "Nunito Sans, sans-serif",
      fontWeightRegular: 300,
      fontWeightMedium: 600,
      fontWeightBold: 800,
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "hsl(0, 0%, 98%)",
              paper: "hsl(0, 0%, 100%)",
            },
            text: {
              primary: "hsl(200, 15%, 8%)",
              secondary: "hsl(0, 0%, 52%)",
            },
          }
        : {
            background: {
              default: "hsl(207, 26%, 17%)",
              paper: "hsl(209, 23%, 22%)",
            },
            text: {
              primary: "hsl(0, 0%, 100%)",
              secondary: "hsl(0, 0%, 100%)",
            },
          }),
    },
  };
}

export const ThemeContext = React.createContext<IThemeContext>({
  toggleMode: () => {},
});
