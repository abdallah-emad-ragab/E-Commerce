import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-body-tertiary text-body border-top py-4 mt-auto">
            <div className="container">
                <div className="row g-4 justify-content-between">
                    {/* Brand & Mission */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                            <i className="bi bi-bag-check-fill text-primary"></i> E-Commerce
                        </h5>
                        <p className="text-body-secondary small pe-lg-4">
                            Premium multi-category store delivering top quality products with instant delivery, transparent stock limits, and secure transactions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-6 col-lg-2">
                        <h6 className="fw-bold mb-3">Navigation</h6>
                        <ul className="list-unstyled small d-flex flex-column gap-2">
                            <li><Link to="/" className="text-body-secondary text-decoration-none">Home</Link></li>
                            <li><Link to="/products" className="text-body-secondary text-decoration-none">All Products</Link></li>
                            <li><Link to="/cart" className="text-body-secondary text-decoration-none">My Cart</Link></li>
                        </ul>
                    </div>

                    {/* Customer Trust */}
                    <div className="col-6 col-lg-2">
                        <h6 className="fw-bold mb-3">Customer Support</h6>
                        <ul className="list-unstyled small d-flex flex-column gap-2 text-body-secondary">
                            <li>Track Order</li>
                            <li>Shipping & Delivery</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>

                    {/* Newsletter Box */}
                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold mb-3">Stay in the Loop</h6>
                        <p className="text-body-secondary small mb-3">Get exclusive offers and new drop alerts directly to your inbox.</p>
                        <div className="input-group input-group-sm">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                aria-label="Newsletter email"
                            />
                            <button className="btn btn-primary" type="button">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="my-4 opacity-25" />

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-body-secondary">
                    <span>
                        &copy; {new Date().getFullYear()} E-Commerce. Created by <a className="text-primary" href="https://abdallah-emad-ragab.vercel.app/" target="_blank">Abdallah Emad Ragab</a>
                    </span>
                    <span className="mt-2 mt-sm-0">Safe & Encrypted Checkout</span>
                </div>
            </div>
        </footer>
    );
}