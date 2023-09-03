import Stepper from '../../components/Stepper';
import { Container, Box } from '@mui/material';
const Dashboard = () => {

    return (

        <Container>
            <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Stepper />
            </Box>
        </Container>
    )
}

export default Dashboard;