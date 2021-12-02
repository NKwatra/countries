import { createTheme, PaletteMode, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import getTheme, { ThemeContext } from "./lib/theme";
import Country from "./routes/Country";
import Home from "./routes/Home";
import { IThemeContext } from "./types/lib/theme";
import "./app.css";

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<MainContent />} />
              <Route path=":code" element={<Country />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
