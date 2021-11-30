import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import CountryInfoRow from "../CountryInfoRow";

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
}

const CountryCard: React.FC<Props> = ({
  flagUrl,
  population,
  name,
  region,
  capital,
}) => {
  return (
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
  );
};

export default CountryCard;
