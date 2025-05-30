import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type LoginStep = "email" | "password";


export default function Login() {
  const [step, setStep] = useState<LoginStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (email.trim()) {
      setStep("password");
    }
  };

  const handleChangeUser = () => {
    setStep("email");
    setPassword("");
  };

  const handleLogin = async () => {
    if (!password.trim()) return;

    setLoading(true);
    try {
      //metodo de firebase para logearse por email y contraseña
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Aquí puedes agregar manejo de errores más específico
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Seccion de fondo blanco */}
      <div className="bg-white w-[70%] float-left flex justify-end pr-[5%]">
        <div className="flex-wrap flex place-items-start mt-[10%]">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="w-40 h-40 bg-transparent rounded-xl flex items-center justify-center">
              <img src={"/img/ufinetLogo.webp"} alt="Logo_Ufinet" />
            </div>

            {/* Division Vertical*/}
            <div className="w-[2px] h-40 bg-blue-400"></div>

            {/* Fomulario del login */}
            <div className="w-80">
              <div className="mb-6">
                <p className="text-black/80 text-sm mb-1">Iniciar sesión a</p>
                <h1 className="text-3xl font-light text-black">Rotana</h1>
              </div>

              {step === "email" ? (
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
                    size="lg"
                    onClick={handleNext}
                    isDisabled={!email.trim()}
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Display entered email */}
                  <div className="text-black text-lg mb-2 font-medium">
                    {email}
                  </div>

                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />

                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium flex items-center justify-center gap-2"
                    size="lg"
                    onClick={handleLogin}
                    isDisabled={!password.trim()}
                    isLoading={loading}
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    {!loading && <FaArrowRight size={16} />}
                  </Button>

                  {/* Bottom links */}
                  <div className="flex justify-between items-center mt-6 text-black text-sm">
                    <button
                      onClick={handleChangeUser}
                      className="flex items-center gap-1 hover:text-black/70 transition-colors"
                    >
                      <FaArrowLeft size={14} />
                      Cambiar Usuario
                    </button>
                    <button className="hover:text-black/70 transition-colors">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 w-[30%]">
        <div className="relative w-full h-screen overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
            autoPlay
            loop
            muted
          >
            <source
              src="https://www.ufinet.com/wp-content/uploads/2024/07/ufinetHeroBanner5.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta el video.
          </video>
        </div>
      </div>
    </div>
  );
}
