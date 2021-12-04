/** @jsxImportSource @emotion/react */
import { Grid, Typography, useTheme, Box, Skeleton } from "@mui/material";
import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import { Props as CountryCardProps } from "../../components/CountryCard";
import networkService from "../../lib/network";
import { useLazyQuery, useQuery } from "../../lib/hooks";
import { css } from "@emotion/react";
import CountryInfoRow from "../../components/CountryInfoRow";
import { CountryName } from "../../types/lib/network";
import LinkButton from "../../components/LinkButton";

export interface Props extends Omit<CountryCardProps, "code"> {
  nativeName: string;
  languages: string;
  tld: string;
  currencies: string;
  subregion: string;
  borders: string[];
}

const Country: React.FC = () => {
  const { code } = useParams();
  const theme = useTheme();
  const {
    loading,
    error,
    data: details,
  } = useQuery<Props, { code: string }>(networkService.loadByCode, {
    code: code as string,
  });

  const [
    loadBorderCountries,
    { loading: borderLoading, error: borderError, data: borders },
  ] = useLazyQuery<CountryName[], { codes: string[] }>(
    networkService.loadBorderCountries
  );

  React.useEffect(() => {
    if (details?.borders) {
      loadBorderCountries({ codes: details.borders });
    }
  }, [details?.borders, loadBorderCountries]);

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <Layout>
      <div
        css={css`
          padding-left: ${theme.spacing(2)};
          padding-right: ${theme.spacing(2)};
          padding-bottom: ${theme.spacing(2)};
          ${theme.breakpoints.up("sm")} {
            padding-left: 0;
            padding-right: 0;
            padding-bottom: 0;
          }
        `}
      >
        <LinkButton
          text="Back"
          startIcon={<MdOutlineKeyboardBackspace />}
          path="/"
        />
        <Grid
          container
          columnSpacing={{
            sm: 4,
            md: 10,
            lg: 12,
          }}
          rowSpacing={4}
          justifyContent="space-between"
          sx={{
            mt: 5 / 2,
          }}
        >
          {loading ? (
            <LoadingIndicator />
          ) : (
            <React.Fragment>
              <Grid item xs={12} sm={6}>
                <img
                  src={details!.flagUrl}
                  alt="Flag of country"
                  css={{
                    width: "100%",
                    height: "auto",
                    boxShadow: theme.shadows[4],
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: {
                    sm: 1,
                    lg: 3,
                  },
                }}
              >
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      fontWeight="bold"
                      color="textPrimary"
                      variant="h6"
                    >
                      {details!.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CountryInfoRow
                      label="Native Name"
                      value={details!.nativeName}
                      gutter
                    />
                    <CountryInfoRow
                      label="Population"
                      value={details!.population.toLocaleString()}
                      gutter
                    />
                    <CountryInfoRow
                      label="Region"
                      value={details!.region}
                      gutter
                    />
                    <CountryInfoRow
                      label="Sub Region"
                      value={details!.subregion}
                      gutter
                    />
                    <CountryInfoRow label="Capital" value={details!.capital} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      mt: {
                        xs: 4,
                        sm: 0,
                      },
                    }}
                  >
                    <CountryInfoRow
                      label="Top Level Domain"
                      value={details!.tld}
                      gutter
                    />
                    <CountryInfoRow
                      label="Currencies"
                      value={details!.currencies}
                      gutter
                    />
                    <CountryInfoRow
                      label="Languages"
                      value={details!.languages}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mt: {
                        xs: 2,
                        sm: 1,
                        md: 2,
                        lg: 5,
                      },
                    }}
                  >
                    <div
                      css={css`
                        ${theme.breakpoints.up("sm")} {
                          display: flex;
                          align-items: center;
                        }
                      `}
                    >
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                        noWrap
                        sx={{
                          flexShrink: 0,
                          pb: {
                            xs: 1,
                            md: 0,
                          },
                        }}
                      >
                        Border Countries:&nbsp;
                      </Typography>
                      <div
                        css={css`
                          flex-grow: 1;
                        `}
                      >
                        {borderLoading ? (
                          <Skeleton
                            animation="wave"
                            variant="text"
                            sx={{ width: "100%" }}
                            height={30}
                          />
                        ) : borderError ? (
                          <Typography
                            variant="subtitle2"
                            color="textPrimary"
                            fontWeight="light"
                          >
                            Couldn't load border countries
                          </Typography>
                        ) : (
                          <div
                            css={css`
                              display: flex;
                              flex-wrap: wrap;
                              row-gap: ${theme.spacing(1)};
                            `}
                          >
                            {borders!.map((country) => (
                              <Box px={1 / 2}>
                                <LinkButton
                                  key={country.name}
                                  text={country.name}
                                  path={`/${country.code}`}
                                />
                              </Box>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </div>
    </Layout>
  );
};

export default Country;
