import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";

import { ScrollToTop } from "./components/common/ScrollToTop";

import { Navigate } from "react-router";
import { isAuthenticated } from "./services/auth.service";

// Import the Products API:
import Products from "./pages/Products/Products.tsx";
import Pages from "./pages/Pages/Pages.tsx";

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   if (!isAuthenticated()) {
//     return <Navigate to="/signin" replace />;
//   }

//   return children;
// }
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = isAuthenticated();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/pages" element={<Pages />} />

          <Route path="/error-404" element={ <NotFound /> } />

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
