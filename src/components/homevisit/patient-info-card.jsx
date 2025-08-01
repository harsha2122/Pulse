import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

export function PatientInfoCard({ patientInfo }) {
  if (!patientInfo) return null;

  return (
    <Card sx={{ borderRadius: 1, bgcolor: '#E8F5E8', border: '1px solid #4CAF50' }}>
      <CardContent sx={{ py: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:check-circle-bold" width={20} sx={{ color: 'white' }} />
          </Box>
          <Typography variant="subtitle1" fontWeight={600} color="#4CAF50">
            Patient Information Added
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2">
            <strong>Patient:</strong> {patientInfo.patientName}
          </Typography>
          <Typography variant="body2">
            <strong>Age:</strong> {patientInfo.age} years
          </Typography>
          <Typography variant="body2">
            <strong>Contact:</strong> {patientInfo.contactNumber}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> {patientInfo.address}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
