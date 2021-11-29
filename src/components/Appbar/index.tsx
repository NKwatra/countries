import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import React from "react";
import { ThemeContext } from "../../lib/theme";
import { BsMoon, BsMoonFill } from "react-icons/bs";

const Appbar: React.FC = () => {
  const themeSwitcher = React.useContext(ThemeContext);
  const theme = useTheme();
  const mode = theme.palette.mode;
  return (
    <AppBar position="fixed" color="inherit">
      <Container disableGutters>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            component="h2"
            sx={{
              fontWeight: "fontWeightBold",
            }}
          >
            Where in the world?
          </Typography>
          <Typography
            variant="subtitle2"
            onClick={themeSwitcher.toggleMode}
            sx={{ cursor: "pointer" }}
          >
            {mode === "light" ? <BsMoon /> : <BsMoonFill />} Dark Mode
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
