import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
const Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Products/Products"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <>
      <Header />
      {/* Suspense for lazy loading */}
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/whishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;