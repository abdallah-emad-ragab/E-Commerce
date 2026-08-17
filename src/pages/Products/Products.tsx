import { products } from "../../data/products";
import { Link } from "react-router-dom";

export default function Products() {
    return (
        <section className="container my-4">
            <h1 className="text-center mb-4">Products</h1>

            {/* Grid container with uniform gap */}
            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                        {/* h-100 ensures equal height for all cards */}
                        <div className="card h-100 shadow-sm border-0">
                            {/* Fixed image height with cover fit */}
                            <img src={product.img} alt={product.title} className="card-img-top"
                                style={{ height: "220px", objectFit: "cover" }} />

                            {/* Flex column layout to push bottom content down */}
                            <div className="card-body d-flex flex-column">
                                <span className="badge bg-secondary mb-2 align-self-start text-capitalize">
                                    {product.cat_prefix}
                                </span>

                                <h5 className="card-title fs-6">
                                    {product.title}
                                </h5>

                                {/* mt-auto pushes price and actions to the bottom */}
                                <div className="mt-auto pt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-bold fs-5 text-primary">
                                            {product.price} EGP
                                        </span>
                                        <small className="text-muted">Stock: {product.max}</small>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="btn btn-outline-dark btn-sm"
                                        >
                                            View Details
                                        </Link>
                                        <button className="btn btn-primary btn-sm">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}