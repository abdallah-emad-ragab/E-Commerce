import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeFromCart, changeQuantity, clearCart } from "../../store/cart/cartSlice";
import type { TProduct } from "../../types/products";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.cart);

  // Get products from localStorage
  const productsCheck = localStorage.getItem("products");
  const products: TProduct[] = productsCheck ? JSON.parse(productsCheck) : [];
  const cartProducts = products.filter((product) => product.id in cartItems);

  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price * (cartItems[product.id] || 0),
    0
  );

  // Check if cart is empty
  if (!Object.keys(cartItems).length) {
    return (
      <div className="text-center my-5">
        <div className="py-5">
          <i className="bi bi-cart-x text-muted" style={{ fontSize: "4rem" }} />
          <h2 className="mt-3">Your Cart is Empty</h2>
          <p className="text-muted">Looks like you haven't added any products yet.</p>
          <Link to="/products" className="btn btn-primary px-4 py-2 mt-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="container my-5 py-5">
      {/* Top section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Cart</h2>
        <Link to="/products" className="btn btn-outline-primary btn-sm">
          Continue Shopping
        </Link>
      </div>

      {/* Cart Products List */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              {cartProducts.map((product, index) => {
                const quantity = cartItems[product.id] || 1;
                return (
                  <div key={product.id}
                    className={`p-3 d-flex align-items-center justify-content-between ${
                      index !== cartProducts.length - 1 ? "border-bottom" : ""}`}>
                    {/* Product Details */}
                    <div className="d-flex align-items-center gap-3">
                      <img src={`${product.img}?auto=format&fit=crop&w=120&q=80`} alt={product.title}
                        className="rounded" style={{ width: "70px", height: "70px", objectFit: "cover" }} />
                      <div>
                        <h6 className="mb-1">{product.title}</h6>
                        <small className="text-muted">{product.price} EGP</small>
                      </div>
                    </div>

                    {/* Quantity Selector, Price & Remove Button */}
                    <div className="d-flex align-items-center gap-3">
                      <select className="form-select form-select-sm" style={{ width: "65px" }} value={quantity}
                        onChange={(e) => dispatch(changeQuantity({productId: product.id, quantity: Number(e.target.value)}))}
                        >
                        {Array.from({ length: product.max }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                      </select>

                      <span className="fw-bold text-primary" style={{ minWidth: "80px", textAlign: "right" }}>
                        {product.price * quantity} EGP
                      </span>

                      <button type="button" className="btn btn-outline-danger btn-sm"
                        onClick={() => dispatch(removeFromCart(product.id))}
                        title="Remove item">
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Total:</span>
                <span className="fw-bold fs-5 text-primary">{totalPrice} EGP</span>
              </div>

              <div className="d-grid gap-2">
                {/* Temporary placeholder button for Confirm Purchase */}
                <button type="button" className="btn btn-primary"
                  onClick={() => alert("Order placed successfully! (Placeholder)")}
                >
                  Confirm Order
                </button>

                {/* Clear Cart Button */}
                <button type="button" className="btn btn-outline-danger btn-sm"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}