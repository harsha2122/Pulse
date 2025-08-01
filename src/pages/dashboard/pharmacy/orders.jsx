// 📄 src/pages/dashboard/pharmacy/orders.jsx
import { Helmet } from 'react-helmet-async';

import { Card, Container, Typography, CardContent } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Orders | Pharmacy</title>
      </Helmet>
      <DashboardContent>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Pharmacy Orders
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Pharmacy Orders page - Coming Soon
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </DashboardContent>
    </>
  );
}
