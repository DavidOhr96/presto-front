import { HomePage } from './pages/home.jsx'
import { PresPage} from './pages/pres-page.jsx'

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'pres/:title',
        component: <PresPage />,
        label: 'Pres'
    }
]

export default routes

