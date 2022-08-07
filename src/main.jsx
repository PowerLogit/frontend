import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Router from './pages/Router'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<Router />)
