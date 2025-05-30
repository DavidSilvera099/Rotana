import { Link } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/hook/useAuth";
import { AdminCreateUser } from "./admin/AdminCreateUser";


export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DefaultLayout>
      <h1>Index Page</h1>
      <Link to="/ejemplo">Ejemplo</Link>
      <div>
        <h1>Dashboard</h1>
        {user?.role === "admin" ? (
          <>
            <p>Bienvenido Administrador</p>
            <AdminCreateUser />const userCred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
{/*             <AddContractor /> */}
          </>
        ) : (
          <p>Vista para contratista: {user?.contractor} </p>
        )}
      </div>
    </DefaultLayout>
  );
}
