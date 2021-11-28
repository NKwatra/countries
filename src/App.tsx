import { createTheme, PaletteMode, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import getTheme, { ThemeContext } from "./lib/theme";
import { IThemeContext } from "./types/lib/theme";

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const themeSwitcher = React.useMemo<IThemeContext>(
    () => ({
      toggleMode: () =>
        setMode((curr) => (curr === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = React.useMemo<Theme>(() => createTheme(getTheme(mode)), [mode]);
  return (
    <ThemeContext.Provider value={themeSwitcher}>
      <ThemeProvider theme={theme}>
        <BrowserRouter></BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
