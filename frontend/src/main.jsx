import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { EventProvider } from './context/EventContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <EventProvider>
      <App />
    </EventProvider>
  </BrowserRouter>
)
