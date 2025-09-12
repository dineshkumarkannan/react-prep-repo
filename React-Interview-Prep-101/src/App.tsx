import React, { Suspense } from "react";
import Layout from "./components/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import Posts from "./pages/Posts";
import ContactLayout from "./components/ContactLayout";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import NotFound from "./components/NotFound";
import PostsLayout from "./components/PostsLayout";
import fetchPosts from "./utils/fetchPosts";
import PostDetails from "./pages/Post-details";
import RouteError from "./components/RouteError";
import AuthProvider from "./context/AuthContext";
import RequiredAuth from "./components/RequiredAuth";
import AuthLayout from "./components/AuthLayout";
import AuthLogin from "./components/AuthLogin";
import Products from "./pages/Products";
const LazyAbout = React.lazy(() => import("./pages/About"));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            <Suspense fallback="Loading...">
              <LazyAbout />
            </Suspense>
          }
        />
        <Route
          path="posts"
          element={
            <RequiredAuth>
              <PostsLayout />
            </RequiredAuth>
          }
        >
          <Route
            index
            element={<Posts />}
            loader={() => fetchPosts()}
            errorElement={<RouteError />}
          />
          <Route path=":id" element={<PostDetails />} />
        </Route>
        <Route path="contact" element={<ContactLayout />}>
          <Route index element={<ContactInfo />} />
          <Route path="form" element={<ContactForm />} />
        </Route>
        <Route path="products" element={<Products />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<AuthLogin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
