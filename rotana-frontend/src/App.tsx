import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import EjemploPage from "@/pages/ejemplo";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<EjemploPage />} path="/ejemplo" />
    </Routes>
  );
}

export default App;
