import { Typography } from "@mui/material";

type Props = {
  /** Label for the field */
  label: string;
  /** Value of the field */
  value: string;
  /** Whether there should be gutter at bottom */
  gutter?: boolean;
};

const CountryInfoRow: React.FC<Props> = ({ label, value, gutter }) => {
  return (
    <div style={{ display: "flex" }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "fontWeightMedium",
          flexShrink: 0,
        }}
        noWrap
        color="textPrimary"
        gutterBottom={gutter}
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
        color="textPrimary"
        gutterBottom={gutter}
      >
        {value}
      </Typography>
    </div>
  );
};
export default CountryInfoRow;
