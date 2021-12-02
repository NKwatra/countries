/** @jsxImportSource @emotion/react */
import { Autocomplete, Paper, TextField, useTheme } from "@mui/material";
import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { debounce } from "lodash";
import networkService from "../../lib/network";
import { Link } from "react-router-dom";

type Suggestion = {
  name: string;
  code: string;
};

const Searchbar: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<Suggestion[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOptions = React.useCallback(
    debounce(async function (name: string) {
      if (!name) {
        return;
      }
      const suggestions = await networkService.loadByName(name);
      setOptions(suggestions);
    }, 300),
    []
  );
  const theme = useTheme();

  function handleInputChange(_: any, value: string) {
    setInputValue(value);
    fetchOptions(value.toLowerCase());
  }

  function getOptionLabel(option: Suggestion) {
    return option.name;
  }

  function renderOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Suggestion
  ) {
    return (
      <li {...props} css={{ paddingLeft: `${theme.spacing(3)} !important` }}>
        <Link
          to={`/${option.code}`}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            textDecoration: "none",
            color: theme.palette.text.primary,
          }}
        >
          {option.name}
        </Link>
      </li>
    );
  }

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      freeSolo
      fullWidth
      PaperComponent={(props) => (
        <Paper {...props} sx={{ backgroundImage: "none", mt: 1 }} />
      )}
      ListboxProps={{
        style: {
          fontSize: "0.875rem",
        },
      }}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      filterOptions={(x) => x}
      options={options}
      disableClearable
      noOptionsText="No Country Found"
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          variant="filled"
          sx={{
            boxShadow: 2,
            borderRadius: 1,
          }}
          placeholder="Search for a country..."
          InputProps={{
            ...InputProps,
            color: "secondary",
            disableUnderline: true,
            startAdornment: (
              <MdOutlineSearch
                color={theme.palette.text.secondary}
                size={24}
                style={{
                  marginRight: theme.spacing(2),
                }}
              />
            ),
            sx: {
              fontSize: "0.875rem",
              backgroundImage: "none",
              py: 3 / 2,
              px: 3,
              paddingTop: `${theme.spacing(3 / 2)} !important`,
              paddingLeft: `${theme.spacing(3)} !important`,
              bgcolor: "primary.main",
              borderRadius: 1,
              "&:hover": {
                bgcolor: "background.paper",
              },
              "&.Mui-focused": {
                bgcolor: "background.paper",
              },
            },
          }}
        />
      )}
    />
  );
};

export default Searchbar;
