// src/components/homevisit/duration-options.jsx
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

export function DurationOptions({ durations, onDurationSelect }) {
  const theme = useTheme();

  if (!durations?.length) return null;

  return (
    <Card sx={{ mb: 2, borderRadius: 1 }}>
      <CardHeader
        title="Select Duration"
        subheader="Choose the duration of service you need"
        sx={{ py: 1.5 }}
      />
      <CardContent sx={{ py: 1.5 }}>
        <Grid container spacing={2}>
          {durations.map((duration) => (
            <Grid item xs={6} key={duration.id}>
              <Card
                onClick={() => onDurationSelect(duration)}
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  bgcolor: duration.isActive ? '#E3F2FD' : 'background.paper',
                  border: duration.isActive ? '2px solid #2196F3' : '1px solid',
                  borderColor: duration.isActive ? '#2196F3' : 'divider',
                  borderRadius: 1,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Stack spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: duration.isActive ? '#2196F3' : 'background.neutral',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon="solar:clock-circle-bold"
                      width={20}
                      sx={{ color: duration.isActive ? 'white' : 'text.secondary' }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={duration.isActive ? '#2196F3' : 'text.primary'}
                    >
                      {duration.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={duration.isActive ? '#2196F3' : 'text.secondary'}
                    >
                      {duration.description}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
