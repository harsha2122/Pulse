// src/components/homevisit/service-categories.jsx
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

export function ServiceCategories({ categories, onCategorySelect }) {
  const theme = useTheme();

  if (!categories?.length) return null;

  return (
    <Card sx={{ mb: 2, borderRadius: 1 }}>
      <CardHeader
        title="Select Service Type"
        subheader="Choose the type of healthcare service you need"
        sx={{ py: 1.5 }}
      />
      <CardContent sx={{ py: 1.5 }}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={6} key={category.id}>
              <Card
                onClick={() => onCategorySelect(category)}
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  bgcolor: category.isActive ? category.bgColor : 'background.paper',
                  border: category.isActive ? `2px solid ${category.color}` : '1px solid',
                  borderColor: category.isActive ? category.color : 'divider',
                  borderRadius: 1,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: category.isActive ? category.bgColor : 'background.neutral',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon={category.icon}
                      width={20}
                      sx={{ color: category.isActive ? category.color : 'text.secondary' }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color={category.isActive ? category.color : 'text.primary'}
                    >
                      {category.name}
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
