import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import CountryInfoRow from "../CountryInfoRow";

type Props = {
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
};

const CountryCard: React.FC<Props> = ({
  flagUrl,
  population,
  name,
  region,
  capital,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        src={flagUrl}
        sx={{
          width: "100%",
          maxWidth: "100%",
          height: "auto",
        }}
        alt="flag of country"
      />
      <CardContent sx={{ p: 4, "&:last-child": { pb: 5 } }}>
        <Typography
          sx={{
            fontWeight: "fontWeightBold",
            mb: 2,
          }}
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
