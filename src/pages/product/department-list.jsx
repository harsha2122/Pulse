import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useGetProducts } from 'src/actions/product';

import { DepartmentView } from 'src/sections/product/view/departments-view';

// ----------------------------------------------------------------------

const metadata = { title: `Product shop - ${CONFIG.site.name}` };

export default function Page() {
  const { products, productsLoading } = useGetProducts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DepartmentView products={products} loading={productsLoading} />
    </>
  );
}
