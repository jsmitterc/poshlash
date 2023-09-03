import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Chip from '../Chip';
import { Box, Grid, Typography } from '@mui/material';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


dayjs.extend(utc);
dayjs.extend(timezone);


const ResponsiveDatePickers = (props) => {
    const { confirmationDetails, setConfirmationDetails } = props
    const [list, setList] = React.useState({ morning : [], afternoon : [], evening: []});
    const [selectedTime, setSelectedTime] = React.useState(null);

    const handleChange = (dateValue) => {

        fetch("http://127.0.0.1:8000/availible_dates", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "services": confirmationDetails.services,
                "date": dateValue
            }),
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)          
            setList(data.times);
            setConfirmationDetails({...confirmationDetails, date: data.date})
        })
        .catch(error => console.error(error));
    }

    React.useEffect(() => {

        handleChange("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isWeekend = (date) => {
        const day = date.day();
      
        return day === 0;
      };

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime)
        setConfirmationDetails({...confirmationDetails, time: newTime})

    }

  return (
    <Box
        sx={{ p: 5}}
    >
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        timezone="America/Santiago"
                        disablePast={true}
                        onChange={(e) => {handleChange(e)}}
                        shouldDisableDate={isWeekend}
                        />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb : 4}}>
                <Typography variant="h4" gutterBottom>
                    Manana
                </Typography>
                <Chip list={list.morning} setSelectedTime={handleTimeChange} selectedTime={selectedTime}/>
                <Typography variant="h4" gutterBottom>
                    Tarde
                </Typography>
                <Chip list={list.afternoon} setSelectedTime={handleTimeChange} selectedTime={selectedTime}/>
                <Typography variant="h4" gutterBottom>
                    Noche
                </Typography>
                <Chip list={list.evening} setSelectedTime={handleTimeChange} selectedTime={selectedTime}/>            
            </Grid>
        </Grid>
    </Box>
  );
};

export default React.memo(ResponsiveDatePickers);