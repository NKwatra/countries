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
        marginTop: 88,
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </main>
  );
};

export default Layout;
