import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

export default function ClickableChips(props) {
  const { list, selectedTime, setSelectedTime } = props;
  const handleClick = (e) => {
    setSelectedTime(e.target.innerHTML);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mb : 2}} useFlexGap flexWrap="wrap">
      {list.map(function(item,i){

        return (
          <Chip key={i}  color={ selectedTime === item ? "success" : "primary"} label={item} onClick={(e) => handleClick(e)} />
        )

      })}

      {list.length ? "" : <Typography>No hay disponibilidad</Typography>}
      
    </Stack>
  );
}