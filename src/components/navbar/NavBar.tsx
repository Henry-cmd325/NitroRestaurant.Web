import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css"

interface MyComponentProps {
    children: React.ReactNode;
  }

export const NavBar: React.FC<MyComponentProps> = ({ children }) => {
    const location = useLocation()

    const getLinkClass = (path: string) => {
        if (path === "/sales" && location.pathname === "/")
            return styles.navlink
        if (path === "/products" && location.pathname === "/create-product")
            return styles.navlink
        if (path === "/employees" && location.pathname === "/create-employee")
            return styles.navlink
        
        return location.pathname === path? styles.navlink: '';
    }

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2>NitroRestaurant</h2>
                <ul>
                    <li className={getLinkClass("/sales")}>
                        <Link to="/sales">
                            <i className="fa-solid fa-chart-line"></i>
                            <span>Ventas</span>
                        </Link>
                        <hr/>
                    </li>
                    <li className={getLinkClass("/products")}>
                        <Link to="/products">
                            <i className="fa-solid fa-utensils"></i>
                            <span>Productos</span>
                        </Link>
                        <hr/>
                    </li>
                    <li className={getLinkClass("/employees")}>
                        <Link to="/employees">
                            <i className="fa-regular fa-address-book"></i>
                            <span>Empleados</span>
                        </Link>
                        <hr/>
                    </li>
                </ul>
            </aside>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}