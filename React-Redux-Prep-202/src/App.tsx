import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Count from "./pages/Count";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="count" element={<Count />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="users" element={<Users />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
