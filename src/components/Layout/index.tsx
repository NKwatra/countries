/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, useTheme } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  return (
    <main
      css={css`
        background: ${theme.palette.background.default};
        margin: -8px;
      `}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: 4,
          px: {
            lg: 0,
          },
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
