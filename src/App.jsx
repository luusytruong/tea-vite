import "./App.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
