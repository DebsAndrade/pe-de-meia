import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './context/ThemeContext'
import { PreferencesProvider } from './context/PreferencesContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PreferencesProvider>
          <BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
          </BrowserRouter>
        </PreferencesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
