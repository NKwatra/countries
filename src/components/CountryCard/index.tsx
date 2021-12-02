/** @jsxImportSource @emotion/react */
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import CountryInfoRow from "../CountryInfoRow";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

export interface Props {
  /** Url for image of country's flag */
  flagUrl: string;
  /** name of the country */
  name: string;
  /** Country's population */
  population: number;
  /** Region of the country */
  region: string;
  /** capital of the country */
  capital: string;
  /** code of the country */
  code: string;
}

const CountryCard: React.FC<Props> = ({
  flagUrl,
  population,
  name,
  region,
  capital,
  code,
}) => {
  return (
    <Link
      to={`/${code}`}
      css={css`
        display: block;
        text-decoration: none;
      `}
    >
      <Card sx={{ backgroundImage: "none", boxShadow: 3 }}>
        <CardMedia
          component="img"
          src={flagUrl}
          height={180}
          alt="flag of country"
        />
        <CardContent sx={{ p: 4, "&:last-child": { pb: 5 } }}>
          <Typography
            sx={{
              fontWeight: "fontWeightBold",
              mb: 2,
            }}
            noWrap
          >
            {name}
          </Typography>
          <div>
            <CountryInfoRow
              label="Population"
              value={population.toLocaleString()}
            />
            <CountryInfoRow label="Region" value={region} />
            <CountryInfoRow label="Capital" value={capital} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
