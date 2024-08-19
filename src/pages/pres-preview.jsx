import routes from '../routes'
import { Link, NavLink } from 'react-router-dom'
export function PresPreview() {

    return (
        <section>
            <h2>im pres</h2>
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
            </nav>

        </section>
    )
}
