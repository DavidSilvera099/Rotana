import { useAuth } from "@/hook/useAuth";

export default function Dashboard() {
  const { user } = useAuth();


  return (
    <>
  <h2>Bienvenido al dashboard {user?.email} </h2>
    {user?.role === 'admin' && <p>Bienvenido Administrador</p>}    
    {user?.role === 'users_contractors' && <p>Bienvenido Contratista</p>}    
        {/* {user?.role === "admin" ? (
          <>
            <p>Bienvenido Administrador</p>
            <AdminCreateUser />

          </>
        ) : (
          <p>Vista para contratista: {user?.contractor} </p>
        )} */}

    </>
  );
}
