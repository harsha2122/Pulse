// src/pages/dashboard/diagnostics/category.jsx

import { Helmet } from 'react-helmet-async';

import { DiagnosticsCheckoutView } from 'src/sections/overview/diagnostics/view/diagnostics-checkout-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Category Details | Diagnostics</title>
      </Helmet>

      <DiagnosticsCheckoutView />
    </>
  );
}
