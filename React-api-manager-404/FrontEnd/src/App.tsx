import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadFromStore } from "./store/features/Auth/authSlice";
import PostDetails from "./Components/PostDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStore());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
