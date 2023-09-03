import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, TextField, FormControl } from '@mui/material';


export default function BasicCard(props) {
    const { confirmationDetails, setConfirmationDetails } = props;
    const handleForm = (e) => {
        setConfirmationDetails({...confirmationDetails, customer : {...confirmationDetails["customer"], [e.target.name] : e.target.value }});
    }

    React.useEffect(()=>{
        // const userDetails = JSON.parse(localStorage.getItem('user'));
        // setUserDetails(userDetails)
    },[])

  return (
    <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="center"
    >
        <Grid item md={6}>
            <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Resumen de reserva
                </Typography>
                <Typography variant="h3" component="div">
                    Cita PoshLash
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Fecha cita: {confirmationDetails.date}
                <br />
                Hora cita: {confirmationDetails.time}
                </Typography>
                    {confirmationDetails.services.map(function(list,i){
                        return (
                            <Typography key={i} variant="body2">
                                {list.title} (${list.price}) con {list.professional[0].title}
                                <br />                            
                            </Typography>

                        )
                    })}
                <Typography variant="h3">
                    Total: ${confirmationDetails.services.reduce((accumulator, object) => {
                    return accumulator + object["price"];
                    }, 0)}
                </Typography>
            </CardContent>
            </Card>             
        </Grid>
        <Grid item md={6}>
            <Typography variant="h5" sx={{ mb : 2}}>
                Tus datos
            </Typography>
            <FormControl fullWidth sx={{ mb : 1}}>
                <TextField name="fullname" label="Nombre Completo" variant="outlined" onChange={handleForm} value={confirmationDetails.customer.fullname}/>
            </FormControl>
            <FormControl fullWidth sx={{ mb : 1}}>
               <TextField name="phone" label="Telefono" variant="outlined" onChange={handleForm} value={confirmationDetails.customer.phone}/>   
            </FormControl>
            <FormControl fullWidth sx={{ mb : 1}}>
                <TextField name="email" label="Correo Electronico" variant="outlined" onChange={handleForm} value={confirmationDetails.customer.email}/>
            </FormControl>
        </Grid>
       
    </Grid>

  );
}