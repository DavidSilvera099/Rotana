import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hook/useAuth';

export function ProtectedRoute({ children, roles }: { children: JSX.Element; roles: string[] }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user || !roles.includes(user.role)) return <Navigate to="/" />;

  return children;
}
