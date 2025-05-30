import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from "@/components/ProjectedRoute";

const Login = lazy(() => import('@/pages/auth/login'));

const Dashboard = lazy(() => import('@/pages/index'));

function App() {
  return (
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['admin', 'users_contractors']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
  );
}

export default App;
