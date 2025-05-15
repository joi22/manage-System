import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'sonner';
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { UserContextProvider } from './context/UserContextProvider.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';  // <-- import your ThemeProvider

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <ThemeProvider>  {/* <-- wrap with ThemeProvider */}
      <>
        <App />
        <Toaster richColors position="top-right" />
      </>
    </ThemeProvider>
  </UserContextProvider>
);
