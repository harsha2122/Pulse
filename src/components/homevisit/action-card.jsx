import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

export function ActionCard({
  title,
  subtitle,
  icon,
  bgColor = '#E8F5E8',
  iconColor = '#4CAF50',
  onClick,
  disabled = false
}) {
  const theme = useTheme();

  return (
    <Card
      onClick={disabled ? undefined : onClick}
      sx={{
        p: 2,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        opacity: disabled ? 0.6 : 1,
        '&:hover': disabled ? {} : {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
          borderColor: iconColor,
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1,
            bgcolor: disabled ? '#F5F5F5' : bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Iconify
            icon={icon}
            width={24}
            sx={{ color: disabled ? '#BDBDBD' : iconColor }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 0.5 }}
            color={disabled ? 'text.disabled' : 'text.primary'}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color={disabled ? 'text.disabled' : 'text.secondary'}
          >
            {subtitle}
          </Typography>
        </Box>
        <Iconify
          icon="solar:arrow-right-bold"
          width={24}
          sx={{ color: disabled ? 'text.disabled' : 'text.secondary' }}
        />
      </Stack>
    </Card>
  );
}
