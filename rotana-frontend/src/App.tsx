import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from "@/components/ProjectedRoute";

const Table = lazy(()=> import('@/pages/SectionTable'))
const DefaultLayout= lazy (()=> import('@/layouts/default'))
const Login = lazy(() => import('@/pages/auth/login'));

const HomeLanding = lazy(() => import('@/pages/SectionHome'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Layout con rutas protegidas */}
        <Route
        path="/dashboard"
          element={
            <ProtectedRoute roles={['admin', 'users_contractors']}>
              <DefaultLayout />
            </ProtectedRoute>
          }
        >
          <Route path="landing" element={<HomeLanding />} />
          <Route path="table" element={<Table />} />
          {/* <Route path="/perfil" element={<Perfil />} /> */}
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
