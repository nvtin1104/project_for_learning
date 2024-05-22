/* eslint-disable import/no-unresolved */
/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { ToastContainer } from 'react-toastify';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import 'src/configs/firebase'
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <ToastContainer stacked  />
      <Router />
    </ThemeProvider>
  );
}
