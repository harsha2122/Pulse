import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  // Added missing icons
  myvitals: icon('ic-analytics'), // Using analytics icon as fallback, or create ic-myvitals.svg
  website: icon('ic-file'), // Using file icon as fallback, or create ic-website.svg
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      {
        title: 'Dashboard',
        path: paths.dashboard.general.course,
        icon: ICONS.dashboard,
      },
    ],
  },

  /**
   * Services
   */
  {
    subheader: 'Services',
    items: [
      {
        title: 'Book Appointment',
        path: paths.dashboard.appointment,
        icon: ICONS.booking,
      },
      {
        title: 'Pharmacy',
        path: paths.dashboard.pharmacy.root,
        icon: ICONS.folder,
      },
      {
        title: 'Diagnostics',
        path: paths.dashboard.diagnostics.root,
        icon: ICONS.invoice,
      },
      {
        title: 'Home Visit',
        path: paths.dashboard.homevisit,
        icon: ICONS.tour,
      },
      {
        title: 'Emergency',
        path: paths.dashboard.emergency,
        icon: ICONS.lock,
      },
      {
        title: 'Covid',
        path: paths.dashboard.covid,
        icon: ICONS.label,
      },
    ],
  },

  /**
   * Medical Records (flattened medications section)
   */
  {
    subheader: 'Medical Records',
    items: [
      {
        title: 'Medications',
        path: paths.dashboard.medications.root,
        icon: ICONS.myvitals,
      },
      {
        title: 'Documents',
        path: paths.dashboard.medications.documents,
        icon: ICONS.file,
      },
      {
        title: 'Vitals',
        path: paths.dashboard.medications.vitals,
        icon: ICONS.analytics,
      },
      {
        title: 'Allergies',
        path: paths.dashboard.medications.allergies,
        icon: ICONS.label,
      },
      {
        title: 'Notes',
        path: paths.dashboard.medications.notes,
        icon: ICONS.blog,
      },
    ],
  },
];


