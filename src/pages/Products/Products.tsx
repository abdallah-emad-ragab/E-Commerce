import { useState } from "react";
import { products } from "../../data/products";
import { Link } from "react-router-dom";

export default function Products() {
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    const filteredProducts = products.filter((product) => {
        const searchMatch = product.title.toLowerCase().includes(search.toLowerCase());
        const filterMatch = filter === "" || product.cat_prefix === filter;
        return searchMatch && filterMatch;
    });

    return (
        <section className="container my-4">
            {/* Title */}
            <h1 className="text-center mb-4">Products</h1>

            {/* Search & Filter */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Search products..."
                        value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option selected value="">All Categories</option>
                        {[...new Set(products.map((product) => product.cat_prefix))].map((cat_prefix) => (
                            <option key={cat_prefix} value={cat_prefix}>
                                {cat_prefix}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products */}
            <div className="row g-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm border-0">
                            <img src={product.img} alt={product.title} className="card-img-top"
                                style={{ height: "220px", objectFit: "cover" }} />

                            <div className="card-body d-flex flex-column">
                                <span className="badge bg-secondary mb-2 align-self-start text-capitalize">
                                    {product.cat_prefix}
                                </span>
                                <h5 className="card-title fs-6">
                                    {product.title}
                                </h5>

                                <div className="mt-auto pt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-bold fs-5 text-primary">
                                            {product.price} EGP
                                        </span>
                                        <small className="text-muted">Stock: {product.max}</small>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <Link to={`/products/${product.id}`} className="btn btn-outline-dark btn-sm">
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