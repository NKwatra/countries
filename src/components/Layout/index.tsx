import { Container } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        pt: 4,
        px: {
          lg: 0,
        },
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
