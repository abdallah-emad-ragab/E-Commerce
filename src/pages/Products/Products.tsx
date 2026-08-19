import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleWishlist } from "../../store/wishlist/wishlistSlice";
import { addToCart } from "../../store/cart/cartSlice";
import type { TProduct } from "../../types/products";

export default function Products() {
    const dispatch = useAppDispatch();

    const wishlistIds = useAppSelector((state) => state.wishlist.itemsId);
    const cartItems = useAppSelector((state) => state.cart.items);

    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    const productsCheck = localStorage.getItem("products");
    const products: TProduct[] = productsCheck ? JSON.parse(productsCheck) : [];

    const filteredProducts = products.filter((product) => {
        const searchMatch = product.title.toLowerCase().includes(search.toLowerCase());
        const filterMatch = filter === "" || product.cat_prefix === filter;
        return searchMatch && filterMatch;
    });

    return (
        <section className="container my-5 py-5">
            {/* Title */}
            <h1 className="text-center mb-4">Products</h1>

            {/* Search & Filter */}
            <div className="row g-2 mb-4">
                <div className="col-sm-12 col-md-8">
                    <input type="text" className="form-control" placeholder="Search products..."
                        value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="col-sm-12 col-md-4">
                    <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All Categories</option>
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
                {filteredProducts.map((product) => {
                    const isInWishlist = wishlistIds.includes(product.id);
                    const remainingInStock = product.max - (cartItems[product.id] || 0);
                    return (
                        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="position-relative bg-light">
                                    <img src={`${product.img}?auto=format&fit=crop&w=400&q=80`} alt={product.title} className="card-img-top"
                                        style={{ height: "220px", objectFit: "cover" }} loading="lazy" decoding="async" />
                                    <button type="button" onClick={() => dispatch(toggleWishlist(product.id))} style={{ width: "35px", height: "35px" }}
                                        className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center">
                                        <i className={`bi ${isInWishlist ? "bi-heart-fill text-danger": "bi-heart text-secondary"}`}/>
                                    </button>
                                </div>

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
                                            <small className="text-muted">Stock: {remainingInStock}</small>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <Link to={`/products/${product.id}`} className="btn btn-outline-secondary btn-sm">
                                                View Details
                                            </Link>
                                            <button className={`${remainingInStock > 0 ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}`}
                                                onClick={() => dispatch(addToCart(product.id))} disabled={remainingInStock === 0}>
                                                {remainingInStock > 0 ? "Add to Cart" : "Out of Stock"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
    );
}