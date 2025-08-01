import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PharmacyProductsView } from 'src/sections/overview/pharmacy/view/pharmacy-products-view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Pharmacy Products - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Browse pharmacy products, filter by category, and add items to cart."
        />
      </Helmet>
      <PharmacyProductsView />
    </>
  );
}
