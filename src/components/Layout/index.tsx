import { Container, useTheme } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  return (
    <main
      style={{
        margin: -8,
        paddingTop: 88,
        height: "calc(100vh - 88px)",
        maxHeight: "calc(100vh - 88px)",
        background: theme.palette.background.default,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          maxHeight: "100%",
        }}
      >
        {children}
      </Container>
    </main>
  );
};

export default Layout;
