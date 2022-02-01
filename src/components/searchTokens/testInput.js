import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries from './testCountriesArr';
import { SearchIcon } from './styles';
import searchIcon from '../../assets/icons/searchIconLight.png';

const useStyles = makeStyles({
  noBorder: {
    border: 'none',
  },
});

export default function TestTokensSelect({ isLightTheme }) {
  const classes = useStyles();

  return (
    <Autocomplete
      freeSolo
      autoComplete
      autoHighlight
      options={countries}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      ListboxProps={{ style: { maxHeight: '230px' } }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <SearchIcon src={searchIcon} alt="" />
              </>
            ),
            classes: { notchedOutline: classes.noBorder },
            sx: { color: '#878995' },
          }}
          id="filled-search"
          // onChange={this.searchTokens}
          variant="outlined"
          label="Search tokens..."
          InputLabelProps={{
            style: {
              color: isLightTheme ? 'black' : 'white',
              fontSize: 14,
              fontWeight: 400,
              opacity: 0.5,
            },
          }}
          style={{
            width: 242,
            height: 40,
            backgroundColor: isLightTheme ? '#ffffff' : '#10142c',
            boxShadow: isLightTheme
              ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
              : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
            mixBlendMode: isLightTheme ? 'none' : 'normal',
            backdropFilter: isLightTheme ? 'none' : 'blur(35px)',
            borderRadius: '10px',
          }}
          size="small"
        />
      )}
    />
  );
}
