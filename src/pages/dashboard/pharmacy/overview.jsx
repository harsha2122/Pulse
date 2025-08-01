// src/pages/dashboard/pharmacy/overview.jsx
import { Helmet } from 'react-helmet-async';

import { OverviewPharmacyView } from 'src/sections/overview/pharmacy/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pharmacy Overview | Dashboard</title>
      </Helmet>
      <OverviewPharmacyView />
    </>
  );
}
