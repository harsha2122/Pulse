import { Helmet } from 'react-helmet-async';

import { MedicationsView } from 'src/sections/medications/view';

export default function MedicationsPage() {
  return (
    <>
      <Helmet>
        <title>Medications | Medical Records</title>
        <meta name="description" content="Manage medications and prescriptions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <MedicationsView />
    </>
  );
}
