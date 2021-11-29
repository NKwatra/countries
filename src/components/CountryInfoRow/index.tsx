import { Typography } from "@mui/material";

type Props = {
  /** Label for the field */
  label: string;
  /** Value of the field */
  value: string;
};

const CountryInfoRow: React.FC<Props> = ({ label, value }) => {
  return (
    <div>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "fontWeightMedium",
          display: "inline-block",
        }}
      >
        {label}
      </Typography>
      {": "}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "fontWeightLight",
          display: "inline-block",
        }}
      >
        {value}
      </Typography>
    </div>
  );
};
export default CountryInfoRow;
