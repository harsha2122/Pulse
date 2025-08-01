// src/sections/overview/diagnostics/components/checkout-stepper.jsx

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const stepIcons = {
  0: 'solar:cart-bold',
  1: 'solar:user-bold',
  2: 'solar:card-bold',
};

function StepIcon({ icon, active, completed }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        bgcolor: completed ? 'primary.main' : active ? 'primary.main' : 'grey.300',
        color: completed || active ? 'primary.contrastText' : 'text.secondary',
        transition: theme.transitions.create(['background-color', 'color']),
      }}
    >
      <Iconify icon={icon} width={20} />
    </Box>
  );
}

export function CheckoutStepper({ activeStep, steps }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'horizontal' : 'horizontal'}
        sx={{
          '& .MuiStepConnector-root': {
            top: 20,
          },
          '& .MuiStepConnector-line': {
            borderColor: 'divider',
            borderTopWidth: 2,
          },
          '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
            borderColor: 'primary.main',
          },
          '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
            borderColor: 'primary.main',
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={() => (
                <StepIcon
                  icon={stepIcons[index]}
                  active={activeStep === index}
                  completed={activeStep > index}
                />
              )}
              sx={{
                '& .MuiStepLabel-label': {
                  mt: 1,
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  fontWeight: activeStep === index ? 600 : 400,
                  color: activeStep >= index ? 'text.primary' : 'text.secondary',
                },
              }}
            >
              {!isMobile ? label : label.split(' ')[0]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
