import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutocompleteButton from '../AutocompleteButton';
import List from '../List';
import DatePicker from '../DatePicker';
import ConfirmationCard from '../ConfirmationCard';

const steps = [
                'Elige los servicios que deseas', 
                'Elige la especialista', 
                'Seleciona una fecha y hora',
                'Confirma tu hora'
              ];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [services, setServices ] = React.useState([]);
  const [selectedServices, setSelectedServies] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [confirmationDetails, setConfirmationDetails ] = React.useState({
    "services": "",
    "date": "",
    "time": "",
    "customer": {
        "fullname" : "",
        "phone" : "",
        "email": ""
    }
  });


  
  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  React.useEffect(()=> {
    fetch("http://127.0.0.1:8000")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setServices(data);
      })
      .catch(error => console.error(error));
  },[]);

  const handleListChange = (selected) => {
    if(selected == null){ return; }
    const updatedSelectedList = selectedServices.map(function(item,i){
      return selected.service === item.value ? {...item, professional : [selected] } : item
    })
    console.log(updatedSelectedList);
    setSelectedServies(updatedSelectedList);
    setConfirmationDetails({...confirmationDetails, services: updatedSelectedList})

  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Cita Reservada! Solicitamos abono para agendar. 
            Damos 30 minutos desde la creacion de tu cita.
            Transferir a:

            CANTA ONLINE SPA
            76.722.096-0
            BANCO de creditos e inversiones (BCI)
            Cuenta corriente
            52576388

            $10.000

            Enviar el comprobante a nuestro whatsapp! y listo al confirmar tu pago te enviaremos una confirmacion de tu reserva
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
            { activeStep === 0 ?
                <AutocompleteButton 
                  options={services}
                  label="Servicios"
                  id="services"
                  placeholder="Elige tus servicios"
                  multiple={true}
                  value={value}
                  onChange={(event, value) => {setSelectedServies(value); setValue(value); setConfirmationDetails({...confirmationDetails, services: value})}}
                />
              : activeStep === 1 ?
                <List 
                  list={selectedServices}
                  defaultList={services}
                  handleListChange={handleListChange}
                />
              : activeStep === 2 ?
                
                <DatePicker 
                  confirmationDetails={confirmationDetails}
                  setConfirmationDetails={setConfirmationDetails}
                />
              : activeStep === 3 &&

                <ConfirmationCard 
                    confirmationDetails={confirmationDetails}
                    setConfirmationDetails={setConfirmationDetails}
                  />
            }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
            
            <Button onClick={handleNext} disabled={(selectedServices.filter(e => e.professional.length > 1).length > 0 & activeStep > 0) ? true : false}>
              {activeStep === steps.length - 1 ? 'Completar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}