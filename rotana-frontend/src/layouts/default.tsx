import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";
import { FaHome, FaTable, FaUser } from "react-icons/fa";
import { useAuth } from "@/hook/useAuth";

export default function DefaultLayout() {

  const { user } = useAuth();

  const navItems = [
    { icon: <FaHome />, text: "Inicio", link: "/dashboard/landing" },
    { icon: <FaTable />, text: "Tabla", link: "/dashboard/table" },
    ...(user?.role === "admin"
      ? [{ icon: <FaUser />, text: "Administrador", link: "/perfil" }]
      : []),
  ];

  return (
    <div className="relative h-screen bg-[#224880] pr-14">
      <Navbar items={navItems} logo="/img/logoUfinetWhite.webp" />
      <main className="flex flex-col pl-72 w-full h-auto pt-10">
        <div className=" min-h-[90vh] bg-[#f5f8ff] rounded-3xl">
          <h2 className="text-2xl font-semibold mb-6 p-6">Files</h2>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
