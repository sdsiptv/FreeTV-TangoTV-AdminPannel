/* eslint-disable no-use-before-define */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { countries } from 'utils/constant/countries';

const options = ['Option 1', 'Option 2'];

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397),
        )
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CountrySelect({ sendDataToParent }) {
  const [value, setValue] = React.useState(countries[0]);
  const [inputValue, setInputValue] = React.useState('');
  const classes = useStyles();

  const sendData = () => {
    this.props.parentCallback(value);
  };

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          sendDataToParent(newValue.code);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={countries}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={option => option.code}
        renderOption={option => (
          <React.Fragment>
            <span>{countryToFlag(option.code)}</span>
            {option.label} ({option.code}) +{option.phone}
          </React.Fragment>
        )}
        size="small"
        required
        fullwidth
        renderInput={params => (
          <TextField
            {...params}
            label="Choose the Country"
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
