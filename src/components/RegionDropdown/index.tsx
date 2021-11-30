import { MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material";
import React from "react";
import { BiChevronDown } from "react-icons/bi";

const RegionDropdown: React.FC = () => {
  const [value, setValue] = React.useState("");
  const theme = useTheme();
  const options = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  function renderValue(value: any) {
    if (!value) return "Filter by Region";
    else return value;
  }

  function handleChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    setValue(value);
  }

  return (
    <Select
      fullWidth
      variant="filled"
      disableUnderline
      IconComponent={BiChevronDown}
      displayEmpty
      renderValue={renderValue}
      value={value}
      onChange={handleChange}
      sx={{
        "& svg": {
          right: theme.spacing(3),
          width: "1.2em",
          height: "1.2em",
          top: "calc(50% - 0.6em)",
          color: "text.primary",
        },
        borderRadius: 1,
      }}
      SelectDisplayProps={{
        style: {
          padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
          fontSize: "0.875rem",
          background: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          color: theme.palette.text.primary,
        },
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: -8,
          horizontal: "left",
        },
        variant: "menu",
        MenuListProps: {
          variant: "menu",
          sx: {
            bgcolor: "primary.main",
            color: "text.primary",
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option} dense>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RegionDropdown;
