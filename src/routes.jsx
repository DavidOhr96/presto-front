import { HomePage } from './pages/home.jsx'
import { PresPreview } from './pages/pres-preview.jsx'

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'pres',
        component: <PresPreview />,
        label: 'Pres'
    }
]

export default routes

