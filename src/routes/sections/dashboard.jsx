
// src/routes/sections/dashboard.jsx
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { OverviewCovidView } from 'src/sections/overview/covid/view';
import { OverviewPharmacyView } from 'src/sections/overview/pharmacy/view';
import { OverviewEmergencyView } from 'src/sections/overview/emergency/view';
import { OverviewHomevisitView } from 'src/sections/overview/homevisit/view';
import { OverviewAppointmentView } from 'src/sections/overview/appointment/view';
import { OverviewDiagnosticsView } from 'src/sections/overview/diagnostics/view';

import { AuthGuard } from 'src/auth/guard';

// Diagnostics Pages
const DiagnosticsOverviewPage = lazy(() => import('src/pages/dashboard/diagnostics/overview'));
const DiagnosticsCategoryPage = lazy(() => import('src/pages/dashboard/diagnostics/category'));
const DiagnosticsTestPage = lazy(() => import('src/pages/dashboard/diagnostics/test'));
const DiagnosticsCheckoutPage = lazy(() => import('src/pages/dashboard/diagnostics/checkout'));

// Pharmacy Pages
const PharmacyOverviewPage = lazy(() => import('src/pages/dashboard/pharmacy'));
const PharmacyCategoriesPage = lazy(() => import('src/pages/dashboard/pharmacy/categories'));
const PharmacyCategoryPage = lazy(() => import('src/pages/dashboard/pharmacy/category'));
const PharmacyProductsPage = lazy(() => import('src/pages/dashboard/pharmacy/products'));
// const PharmacyProductPage = lazy(() => import('src/pages/dashboard/pharmacy/product'));
const PharmacyOrdersPage = lazy(() => import('src/pages/dashboard/pharmacy/orders'));
const PharmacyOrderPage = lazy(() => import('src/pages/dashboard/pharmacy/order'));
const PharmacyInventoryPage = lazy(() => import('src/pages/dashboard/pharmacy/inventory'));
const PharmacyConfigurationPage = lazy(() => import('src/pages/dashboard/pharmacy/configuration'));
const PharmacyReportsPage = lazy(() => import('src/pages/dashboard/pharmacy/reports'));

// New Pharmacy View Components - Corrected imports
const PharmacyProductsView = lazy(() => import('src/sections/overview/pharmacy/view/pharmacy-products-view'));
const PharmacyCartView = lazy(() => import('src/sections/overview/pharmacy/view/pharmacy-cart-view'));

// Pharmacy Checkout - Fixed import to use the page component
const PharmacyCheckoutPage = lazy(() => import('src/pages/dashboard/pharmacy/checkout'));

// Overview Pages
const IndexPage = lazy(() => import('src/pages/dashboard'));
const OverviewCoursePage = lazy(() => import('src/pages/dashboard/course'));

// Product Pages
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));

// Appointment Pages
const AppointmentPage = lazy(() => import('src/pages/dashboard/appointment/index'));
const CardiologyPage = lazy(() => import('src/pages/dashboard/appointment/cardiology'));
const DermatologyPage = lazy(() => import('src/pages/dashboard/appointment/dermatology'));
const NeurologyPage = lazy(() => import('src/pages/dashboard/appointment/neurology'));
const OrthopedicsPage = lazy(() => import('src/pages/dashboard/appointment/orthopedics'));
const OphthalmologyPage = lazy(() => import('src/pages/dashboard/appointment/ophthalmology'));
const PediatricsPage = lazy(() => import('src/pages/dashboard/appointment/pediatrics'));
const GynecologyPage = lazy(() => import('src/pages/dashboard/appointment/gynecology'));
const UrologyPage = lazy(() => import('src/pages/dashboard/appointment/urology'));
const DentistryPage = lazy(() => import('src/pages/dashboard/appointment/dentistry'));
const PhysiotherapyPage = lazy(() => import('src/pages/dashboard/appointment/physiotherapy'));
const GeneralMedicinePage = lazy(() => import('src/pages/dashboard/appointment/general-medicine'));

// Blog Pages
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));

// Website Pages
const PrivacyAndPolicyPage = lazy(() => import('src/pages/dashboard/website/details'));
const TermsAndConditionsPage = lazy(() => import('src/pages/dashboard/website/details1'));


// medications pages
const MedicationsPage = lazy(() => import('src/pages/dashboard/medications/index'));
const DocumentsPage = lazy(() => import('src/pages/dashboard/medications/documents'));
const VitalsPage = lazy(() => import('src/pages/dashboard/medications/vitals'));
const AllergiesPage = lazy(() => import('src/pages/dashboard/medications/allergies'));
const NotesPage = lazy(() => import('src/pages/dashboard/medications/notes'));


// ----------------------------------------------------------------------

const layoutContent = (
  <AuthGuard>
    <DashboardLayout>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  </AuthGuard>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      // Main dashboard page
      { element: <IndexPage />, index: true },
      // Top-level service pages
      { path: 'appointment', element: <OverviewAppointmentView /> },
      { path: 'pharmacy', element: <OverviewPharmacyView /> },
      { path: 'diagnostics', element: <OverviewDiagnosticsView /> },
      { path: 'homevisit', element: <OverviewHomevisitView /> },
      { path: 'emergency', element: <OverviewEmergencyView /> },
      { path: 'covid', element: <OverviewCovidView /> },
      { path: 'patient', element: <OverviewCoursePage /> },

      // Appointment Routes
      {
        path: 'appointment',
        children: [
          { element: <OverviewAppointmentView />, index: true },
          { path: 'cardiology', element: <CardiologyPage /> },
          { path: 'dermatology', element: <DermatologyPage /> },
          { path: 'neurology', element: <NeurologyPage /> },
          { path: 'orthopedics', element: <OrthopedicsPage /> },
          { path: 'ophthalmology', element: <OphthalmologyPage /> },
          { path: 'pediatrics', element: <PediatricsPage /> },
          { path: 'gynecology', element: <GynecologyPage /> },
          { path: 'urology', element: <UrologyPage /> },
          { path: 'dentistry', element: <DentistryPage /> },
          { path: 'physiotherapy', element: <PhysiotherapyPage /> },
          { path: 'general-medicine', element: <GeneralMedicinePage /> },
        ],
      },

      // Product Routes
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },

      // Diagnostics Routes
      {
        path: 'diagnostics',
        children: [
          { element: <DiagnosticsOverviewPage />, index: true },
          { path: 'category/:categoryId', element: <DiagnosticsCategoryPage /> },
          { path: 'test/:testId', element: <DiagnosticsTestPage /> },
          // { path: 'cart', element: <DiagnosticsCartPage /> },
           { path: 'checkout', element: <DiagnosticsCheckoutPage /> },
    { path: ':productName/checkout', element: <DiagnosticsCheckoutPage /> }, // NEW: for product-specific checkout
        ],
      },

      // Pharmacy Routes - Enhanced with proper checkout integration
      {
        path: 'pharmacy',
        children: [
          { element: <OverviewPharmacyView />, index: true },
          { path: 'overview', element: <PharmacyOverviewPage /> },
          { path: 'categories', element: <PharmacyCategoriesPage /> },
          { path: 'category/:categoryId', element: <PharmacyCategoryPage /> },
          // Product listing routes
          { path: 'category/:categoryId/products', element: <PharmacyProductsView /> },
          { path: 'products', element: <PharmacyProductsPage /> },
          // { path: 'product/:productId', element: <PharmacyProductPage /> },
          // Shopping cart and checkout routes
          { path: 'cart', element: <PharmacyCartView /> },
          { path: 'checkout', element: <PharmacyCheckoutPage /> },
          // Order management routes
          { path: 'orders', element: <PharmacyOrdersPage /> },
          { path: 'order/:orderId', element: <PharmacyOrderPage /> },
          // Admin routes
          { path: 'inventory', element: <PharmacyInventoryPage /> },
          { path: 'configuration', element: <PharmacyConfigurationPage /> },
          { path: 'reports', element: <PharmacyReportsPage /> },
        ],
      },

      // Blog Routes
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },

      {
        path: 'medications',
        children: [
          { element: <MedicationsPage />, index: true },
          { path: 'documents', element: <DocumentsPage /> },
          { path: 'vitals', element: <VitalsPage /> },
          { path: 'allergies', element: <AllergiesPage /> },
          { path: 'notes', element: <NotesPage /> },
        ],
      },
      // Website Routes
      {
        path: 'website',
        children: [
          { element: <PrivacyAndPolicyPage />, index: true },
          { path: 'privacy_policy', element: <PrivacyAndPolicyPage /> },
          { path: 'terms_conditions', element: <TermsAndConditionsPage /> },
        ],
      },
    ],
  },
];
