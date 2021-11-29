import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import networkService from "../../lib/network";
import CountryCard from "../CountryCard";
import Layout from "../Layout";
import { Props as CountryInfo } from "../CountryCard";

const MainContent: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [countries, setCountries] = React.useState<CountryInfo[]>([]);

  React.useEffect(() => {
    async function loadCountries() {
      const countriesData = await networkService.loadAllCountries();
      setCountries(countriesData);
      setLoading(false);
    }
    loadCountries();
  }, []);

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container rowSpacing={{ xs: 6, lg: 10 }} columnSpacing={2}>
          {countries.map((country) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CountryCard
                name={country.name}
                flagUrl={country.flagUrl}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default MainContent;
