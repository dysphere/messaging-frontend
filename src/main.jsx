import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './AuthProvider.jsx'
import Router from './Router.jsx';
import './index.css'
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
)
