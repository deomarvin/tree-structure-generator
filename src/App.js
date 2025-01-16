import { useRoutes } from "react-router-dom";
import "@fontsource/roboto";
import Structure from "./components/Home/Structure";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <Structure />,
    },
  ]);

  return router;
}
export default App;
