import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "@/config/firebase/firebase";
import { secondaryAuth } from "./firebaseSecondaryAuth";
import { UserData } from "@/types";

// Verifica si el usuario actual es admin
export async function isAdmin(uid: string): Promise<boolean> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const data = snap.data() as UserData;
  return data?.role === "admin";
}

// Solo admins pueden registrar nuevos usuarios
export async function registerUserByAdmin(
  currentUid: string, // UID del usuario actual (admin)
  email: string,
  password: string,
  contractor: string
): Promise<UserData> {
  const adminCheck = await isAdmin(currentUid);
  if (!adminCheck) throw new Error("Solo los administradores pueden registrar usuarios.");

 // Crear usuario con Administrador 
  const userCred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  const user = userCred.user;

  const userData: UserData = {
    uid: user.uid,
    email: user.email || "",
    contractor: contractor,
    role: "users_contractors",
  };

  await setDoc(doc(db, "users", user.uid), userData);
  return userData;
}

// Logica de inicio de sesion con firebase
export async function loginUser(email: string, password: string): Promise<UserData> {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const userRef = doc(db, "users", userCred.user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error("Usuario no encontrado");

  const data = userSnap.data() as UserData;
  return data;
}

// Cierra la sesión del usuario actual
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Retorna true si el email existe en Firebase Auth
export const checkIfEmailExists = async (email: string): Promise<boolean> => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};