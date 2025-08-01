import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export function WelcomeCard({ patientName = 'Patient' }) {
  return (
    <Card sx={{ mb: 2, borderRadius: 1 }}>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Hi, {patientName} 👋
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          How is your health today! Select from our home healthcare services
        </Typography>
      </CardContent>
    </Card>
  );
}
