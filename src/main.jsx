import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Routs/AllRouts.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Provider/AuthProvider';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
