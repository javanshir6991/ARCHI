import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './constants/theme.ts'
import UseQueryProvider from './provider/UseQueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UseQueryProvider>
        <App />
      </UseQueryProvider>
    </ThemeProvider>
  </StrictMode>,
)
