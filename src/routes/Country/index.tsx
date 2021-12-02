import { Button, Grid } from "@mui/material";
import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Layout from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import { Props as CountryCardProps } from "../../components/CountryCard";
import networkService from "../../lib/network";
import { useQuery } from "../../lib/hooks";

export interface Props extends Omit<CountryCardProps, "code"> {
  nativeName: string;
  languages: string;
  tld: string;
  currencies: string;
}

const Country: React.FC = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery<Props, { code: string }>(
    networkService.loadByCode,
    {
      code: code as string,
    }
  );

  return (
    <Layout>
      <Link to="/">
        <Button
          color="primary"
          variant="contained"
          size="large"
          startIcon={<MdOutlineKeyboardBackspace />}
          sx={{
            fontWeight: "fontWeightLight",
            textDecoration: "none",
            textTransform: "none",
            "&:hover": {
              bgcolor: "primary.main",
            },
          }}
        >
          Back
        </Button>
      </Link>
      <Grid
        container
        columnSpacing={6}
        rowSpacing={6}
        justifyContent="space-between"
      >
        {loading ? <LoadingIndicator /> : <Grid item xs={12} md={4}></Grid>}
      </Grid>
    </Layout>
  );
};

export default Country;
