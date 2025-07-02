import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routes/Router.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { AppProvider } from './context/appProvider.tsx';
import HeaderNav from './components/HeaderNav/HeaderNav.tsx';
// import { BrowserRouter } from 'react-router-dom'; // ✅ IMPORTANTE

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    {/* <BrowserRouter> */}
      <ThemeProvider theme={theme}>
        <HeaderNav />
        <AppRouter />
      </ThemeProvider>
    {/* </BrowserRouter> */}
  </AppProvider>
);
