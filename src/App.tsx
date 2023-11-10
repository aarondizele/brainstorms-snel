import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Details, Home, Payment } from "./screens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/details/:id",
    element: <Details />
  },
  {
    path: "/payment",
    element: <Payment />
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
