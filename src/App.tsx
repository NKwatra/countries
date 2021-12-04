import { createTheme, PaletteMode, Theme, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import getTheme, { ThemeContext } from "./lib/theme";
import Country from "./routes/Country";
import Home from "./routes/Home";
import { IThemeContext } from "./types/lib/theme";
import "./app.css";
import { THEME_KEY } from "./lib/constants";

function App() {
  const [mode, setMode] = React.useState<PaletteMode>(
    (localStorage.getItem(THEME_KEY) as PaletteMode) || "dark"
  );
  const themeSwitcher = React.useMemo<IThemeContext>(
    () => ({
      toggleMode: () =>
        setMode((curr) => {
          const newMode = curr === "light" ? "dark" : "light";
          localStorage.setItem(THEME_KEY, newMode);
          return newMode;
        }),
    }),
    []
  );
  const theme = React.useMemo<Theme>(() => createTheme(getTheme(mode)), [mode]);
  return (
    <ThemeContext.Provider value={themeSwitcher}>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/countries">
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
