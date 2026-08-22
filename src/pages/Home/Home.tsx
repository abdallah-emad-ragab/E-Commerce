import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { categories } from "../../data/categories";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-body text-body d-flex flex-column min-vh-100">

            {/* Hero Section */}
            <section className="py-5 my-4 bg-body-tertiary border-bottom">
                <div className="container py-4 text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                                Welcome to Our Store
                            </span>
                            <h1 className="display-5 fw-bold mb-3">
                                Simple, Reliable & Fast Shopping Experience
                            </h1>
                            <p className="lead text-body-secondary mb-4">
                                Explore our catalog across multiple categories with transparent inventory, easy cart management, and fast delivery.
                            </p>
                            <div className="d-flex gap-3 justify-content-center">
                                <Link to="/products" className="btn btn-primary btn-lg px-4 shadow-sm">
                                    Start Shopping <i className="bi bi-arrow-right ms-1"></i>
                                </Link>
                                <Link to="/cart" className="btn btn-outline-secondary btn-lg px-4">
                                    View Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-5 bg-body">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="h4 fw-bold mb-1">Categories</h2>
                            <p className="text-body-secondary small mb-0">Browse products by category</p>
                        </div>
                        <Link to="/products" className="btn btn-outline-primary btn-sm">
                            All Products
                        </Link>
                    </div>

                    <div className="row g-4">
                        {categories.map((cat) => (
                            <div key={cat.title} className="col-6 col-md-4">
                                <div
                                    className="card border-0 rounded-3 overflow-hidden position-relative shadow-sm"
                                    style={{ height: "180px", cursor: "pointer" }}
                                    onClick={() => navigate(`/products/${cat.prefix}`)}
                                >
                                    {cat.img ? (
                                        <img
                                            src={`${cat.img}?auto=format&fit=crop&w=400&q=80`}
                                            alt={cat.title}
                                            className="w-100 h-100 position-absolute top-0 start-0"
                                            style={{ objectFit: "cover" }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-100 h-100 bg-secondary" />
                                    )}
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                        style={{ background: "rgba(0, 0, 0, 0.5)" }}
                                    >
                                        <h5 className="text-white text-capitalize fw-bold mb-0 text-center px-2">
                                            {cat.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-5 bg-body-tertiary border-top border-bottom">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h4 fw-bold mb-2">Why Choose Us?</h2>
                        <p className="text-body-secondary small">Built to give you a dependable shopping journey</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border bg-body shadow-sm p-4 text-center">
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                                    <i className="bi bi-box-seam fs-3"></i>
                                </div>
                                <h5 className="fw-bold mb-2">Accurate Inventory</h5>
                                <p className="text-body-secondary small mb-0">
                                    Real-time stock limits ensure you only order what is physically available in our inventory.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border bg-body shadow-sm p-4 text-center">
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                                    <i className="bi bi-truck fs-3"></i>
                                </div>
                                <h5 className="fw-bold mb-2">Fast Order Dispatch</h5>
                                <p className="text-body-secondary small mb-0">
                                    Quick processing and clear tracking from our inventory straight to your destination.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border bg-body shadow-sm p-4 text-center">
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                                    <i className="bi bi-shield-check fs-3"></i>
                                </div>
                                <h5 className="fw-bold mb-2">Reliable Storage</h5>
                                <p className="text-body-secondary small mb-0">
                                    Your cart and wishlist items remain saved and synced securely across all your sessions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />

        </div>
    );
}