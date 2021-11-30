import { Typography } from "@mui/material";

type Props = {
  /** Label for the field */
  label: string;
  /** Value of the field */
  value: string;
};

const CountryInfoRow: React.FC<Props> = ({ label, value }) => {
  return (
    <div style={{ display: "flex" }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "fontWeightMedium",
        }}
      >
        {label}:&nbsp;
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "fontWeightLight",
          flexGrow: 1,
        }}
        noWrap
      >
        {value}
      </Typography>
    </div>
  );
};
export default CountryInfoRow;
