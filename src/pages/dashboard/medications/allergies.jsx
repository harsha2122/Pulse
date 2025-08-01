// // src/pages/dashboard/medications/allergies.jsx
// import { Helmet } from 'react-helmet-async';

// import { CONFIG } from 'src/config-global';

// import { MedicationView } from 'src/sections/medications/view/index';

// // ----------------------------------------------------------------------

// const metadata = { title: `Patient Allergies - ${CONFIG.site.name}` };

// export default function AllergiesPage() {
//   return (
//     <>
//       <Helmet>
//         <title>{metadata.title}</title>
//       </Helmet>

//       <MedicationView activeTab="allergies" />
//     </>
//   );
// }

import { Helmet } from 'react-helmet-async';

import { AllergiesView } from 'src/sections/medications/view';

export default function AllergiesPage() {
  return (
    <>
      <Helmet>
        <title>Allergies | Medical Records</title>
        <meta name="description" content="Manage allergies and adverse reactions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <AllergiesView />
    </>
  );
}
