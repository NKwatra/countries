/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CircularProgress, Grid, useTheme } from "@mui/material";
import React from "react";
import networkService from "../../lib/network";
import CountryCard from "../CountryCard";
import Layout from "../Layout";
import { Props as CountryInfo } from "../CountryCard";
import RegionDropdown from "../RegionDropdown";
// import Searchbar from "../Searchbar";

const MainContent: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [countries, setCountries] = React.useState<CountryInfo[]>([]);
  const [region, setRegion] = React.useState<string>("");
  const theme = useTheme();

  React.useEffect(() => {
    async function loadCountries() {
      const countriesData = await networkService.loadAllCountries();
      setCountries(countriesData);
      setLoading(false);
    }
    loadCountries();
  }, []);

  async function loadByRegion(value: string) {
    setRegion(value);
    setLoading(true);
    document.title = `Countries | ${value}`;
    const countriesData = await networkService.loadByRegion(
      value.toLowerCase()
    );
    setCountries(countriesData);
    setLoading(false);
  }

  return (
    <Layout>
      <Grid
        container
        justifyContent="space-between"
        rowSpacing={4}
        sx={{ mb: 4 }}
      >
        <Grid item xs={12} sm={6} md={5}>
          {/* <Searchbar /> */}
        </Grid>
        <Grid item xs={7} sm={3} md={2}>
          <RegionDropdown value={region} setValue={loadByRegion} />
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <div
          css={css`
            flex-grow: 1;
            overflow-y: scroll;
            padding-left: 16px;
            padding-right: 16px;
            ${theme.breakpoints.up("sm")} {
              padding-left: 0;
              padding-right: 0;
            } ;
          `}
        >
          <Grid
            container
            rowSpacing={{ xs: 6, lg: 10 }}
            columnSpacing={{
              xs: 3,
              md: 4,
              lg: 6,
            }}
          >
            {countries.map((country) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={country.name}>
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
        </div>
      )}
    </Layout>
  );
};

export default MainContent;
