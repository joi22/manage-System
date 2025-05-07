import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster } from 'sonner';
import UserContextProvider from './UserContext/UserContextProvider.jsx';

createRoot(document.getElementById('root')).render(
    <>
    <UserContextProvider>

    <App />
    <Toaster richColors position='top-right' />
    </UserContextProvider>
    </>
)
