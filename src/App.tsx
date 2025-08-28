import { RouterProvider } from "react-router";
import { route } from "./routes/router";

export default function App() {
  return <RouterProvider router={route} />;
}
