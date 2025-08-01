// // src/pages/dashboard/medications/notes.jsx
// import { Helmet } from 'react-helmet-async';

// import { CONFIG } from 'src/config-global';

// import { MedicationView } from 'src/sections/medications/view/index';

// // ----------------------------------------------------------------------

// const metadata = { title: `Medical Notes - ${CONFIG.site.name}` };

// export default function NotesPage() {
//   return (
//     <>
//       <Helmet>
//         <title>{metadata.title}</title>
//       </Helmet>

//       <MedicationView activeTab="notes" />
//     </>
//   );
// }

import { Helmet } from 'react-helmet-async';

import { NotesView } from 'src/sections/medications/view';

export default function NotesPage() {
  return (
    <>
      <Helmet>
        <title>Notes | Medical Records</title>
        <meta name="description" content="View clinical notes and assessments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <NotesView />
    </>
  );
}
