import { useState, useEffect } from "react";
import { db } from "@/config/firebase/firebase";
import { collection, getDocs} from "firebase/firestore";
import { logoutUser, registerUserByAdmin } from "@/config/firebase/services/authService";

import { useAuth } from "@/hook/useAuth";

export const AdminCreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contractor, setContractor] = useState("");
  const [contractors, setContractors] = useState<string[] >([]);
  //lee el uid
  const {user} = useAuth()
  // Obtener contratistas
  useEffect(() => {
    const fetchContractors = async () => {
      const snapshot = await getDocs(collection(db, "contractors"));
      const list = snapshot.docs.map((doc) => doc.data().name as string);
      setContractors(list);
    };
    fetchContractors();
  }, []);

  
  const handleRegister = async () => {
    //solo el administrador puede crear usuarios
    await registerUserByAdmin(
      user?.uid as string, // UID del usuario actual (admin)
      email,
      password,
      contractor
    );
    setEmail('');
    setPassword('');
    setContractor('')
    alert("Usuario creado exitosamente");
  }; 

  const logout =()=>{
    logoutUser()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Registrar Usuario</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        value={contractor}
        onChange={(e) => setContractor(e.target.value)}
      >
        <option value="">Selecciona un contratista</option>
        {contractors.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button onClick={handleRegister}>Crear Usuario</button>

      <button onClick={logout}>Cerra sesion</button>
    </div>
  );
};
