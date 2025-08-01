// 📄 src/pages/dashboard/pharmacy/configuration.jsx
import { Helmet } from 'react-helmet-async';

import { OverviewPharmacyView } from 'src/sections/overview/pharmacy/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pharmacy Configuration | Dashboard</title>
      </Helmet>
      <OverviewPharmacyView />
    </>
  );
}
