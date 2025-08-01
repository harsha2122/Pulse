import { Helmet } from 'react-helmet-async';

import { VitalsView } from 'src/sections/medications/view';

export default function VitalsPage() {
  return (
    <>
      <Helmet>
        <title>Vitals | Medical Records</title>
        <meta name="description" content="Track vital signs and health metrics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <VitalsView />
    </>
  );
}
