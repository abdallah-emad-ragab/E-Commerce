import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/auth/authSlice";
import { toggleTheme } from "../../store/theme/themeSlice";

export default function Header() {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.auth);
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

    // Total quantity calculation for cart items
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalQuantity = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container">
                {/* Brand Logo */}
                <Link className="navbar-brand fw-bold" to="/">
                    eCommerce
                </Link>

                {/* Mobile Toggle Button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false"  aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    {/* Main Navigation (Left) */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active fw-semibold" : "nav-link"}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active fw-semibold" : "nav-link"}>
                                Products
                            </NavLink>
                        </li>
                    </ul>

                    {/* Action Links & User Menu (Right) */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">
                        {/* Wishlist Icon */}
                        <li className="nav-item">
                            <NavLink to="/whishlist" className={({ isActive }) => isActive ? "nav-link active fs-5" : "nav-link fs-5"}
                                title="Wishlist">
                                <i className="bi bi-heart" />
                            </NavLink>
                        </li>

                        {/* Cart Icon with Counter Badge */}
                        <li className="nav-item">
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active position-relative fs-5" : "nav-link position-relative fs-5"}
                                title="Cart">
                                <i className="bi bi-cart3" />
                                {totalQuantity > 0 && (
                                    <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger fs-6">
                                        {totalQuantity}
                                    </span>
                                )}
                            </NavLink>
                        </li>

                        {/* Dark Mode Toggle Button Placeholder */}
                        <li className="nav-item">
                            <button className="btn btn-outline-secondary btn-sm border-0"
                                title="Toggle Theme"
                                onClick={() => dispatch(toggleTheme())}
                            >
                                {isDarkMode ? <i className="bi bi-brightness-high-fill" /> : <i className="bi bi-moon-stars-fill" />}
                            </button>
                        </li>

                        {/* Vertical Divider */}
                        <div className="vr d-none d-lg-block mx-2" />

                        {/* Auth Condition */}
                        {currentUser ? (
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle text-capitalize fw-semibold" role="button" data-bs-toggle="dropdown">
                                    {currentUser.firstName || currentUser.email}
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button className="dropdown-item text-danger"
                                            onClick={() => dispatch(logoutUser())}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className="btn btn-primary btn-sm px-3 text-white">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
