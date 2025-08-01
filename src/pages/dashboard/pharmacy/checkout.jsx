// src/pages/dashboard/pharmacy/checkout.jsx
import { Helmet } from 'react-helmet-async';

import { PharmacyCheckoutView } from 'src/sections/overview/pharmacy/view/pharmacy-checkout-view';

// ----------------------------------------------------------------------

export default function PharmacyCheckoutPage() {
  return (
    <>
      <Helmet>
        <title>Pharmacy Checkout | Dashboard</title>
        <meta name="description" content="Complete your pharmacy order checkout securely" />
      </Helmet>

      <PharmacyCheckoutView />
    </>
  );
}
