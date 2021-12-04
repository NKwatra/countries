/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, useTheme } from "@mui/material";
import React from "react";
import networkService from "../../lib/network";
import CountryCard from "../CountryCard";
import Layout from "../Layout";
import { Props as CountryInfo } from "../CountryCard";
import RegionDropdown from "../RegionDropdown";
import Searchbar from "../Searchbar";
import LoadingIndicator from "../LoadingIndicator";
import { useLazyQuery } from "../../lib/hooks";
import Error from "../Error";

type Props = {
  loading: boolean;
  error: boolean;
  countries: CountryInfo[] | undefined;
};

const MainContent: React.FC<Props> = ({ loading, error, countries }) => {
  const [region, setRegion] = React.useState<string>("");
  const [
    searchByRegion,
    { data: filteredCountries, error: regionError, loading: regionLoading },
  ] = useLazyQuery<CountryInfo[], { region: string }>(
    networkService.loadByRegion
  );
  const theme = useTheme();
  const data = filteredCountries || countries;

  function loadByRegion(value: string) {
    setRegion(value);
    document.title = `Countries | ${value}`;
    searchByRegion({ region: value.toLowerCase() });
  }

  if (error || regionError) {
    return <Error />;
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
          <Searchbar />
        </Grid>
        <Grid item xs={7} sm={3} md={2}>
          <RegionDropdown value={region} setValue={loadByRegion} />
        </Grid>
      </Grid>
      <div
        css={css`
          padding-left: 16px;
          padding-right: 16px;
          ${theme.breakpoints.up("sm")} {
            padding-left: 0;
            padding-right: 0;
          }
        `}
      >
        {loading || regionLoading ? (
          <LoadingIndicator />
        ) : (
          <Grid
            container
            rowSpacing={{ xs: 6, lg: 10 }}
            columnSpacing={{
              xs: 3,
              md: 4,
              lg: 6,
            }}
          >
            {data!.map((country) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={country.name}>
                <CountryCard
                  name={country.name}
                  flagUrl={country.flagUrl}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  code={country.code}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Layout>
  );
};

export default MainContent;
