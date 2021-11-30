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
    <AppBar
      position="fixed"
      sx={{
        backgroundImage: "none",
      }}
    >
      <Toolbar
        sx={{
          py: 2,
          px: {
            xs: 2,
            sm: 4,
            md: 7,
          },
        }}
      >
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            component="h2"
            color="textPrimary"
            sx={{
              fontWeight: "fontWeightBold",
              fontSize: {
                xs: "0.875rem",
                md: "1.125rem",
                lg: "1.25rem",
              },
            }}
          >
            Where in the world?
          </Typography>
          <Typography
            onClick={themeSwitcher.toggleMode}
            color="textPrimary"
            sx={{
              fontWeight: "fontWeightMedium",
              fontSize: {
                xs: "0.875rem",
                md: "1.125rem",
                lg: "1.25rem",
              },
              cursor: "pointer",
              "& > svg, & > span": {
                display: "inline-block",
                verticalAlign: "middle",
                color: "text.primary",
              },
              "& > span": {
                ml: 1,
              },
            }}
          >
            {mode === "light" ? <BsMoon /> : <BsMoonFill />}
            <span> Dark Mode </span>
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
