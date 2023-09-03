import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function AutocompleteButton(props) {

  const { id,options, label, placeholder, multiple, sx, value, onChange } = props;

  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple={multiple}
        onChange={onChange}
        sx={sx}
        id={id}
        value={value}
        options={options}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </Stack>
  );
}
