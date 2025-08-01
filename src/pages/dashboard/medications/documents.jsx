import { Helmet } from 'react-helmet-async';

import { DocumentsView } from 'src/sections/medications/view';

export default function DocumentsPage() {
  return (
    <>
      <Helmet>
        <title>Documents | Medical Records</title>
        <meta name="description" content="Manage medical documents and files" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <DocumentsView />
    </>
  );
}
