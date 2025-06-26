import { db } from "@/config/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export const AddContractor = () => {
  const [name, setName] = useState('');

  const add = async () => {
    await addDoc(collection(db, 'contractors'), { name });
    alert('Contratista agregado');
  };

  return (
    <div className="space-y-2">
      <input placeholder="Nombre contratista" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={add}>Agregar</button>
    </div>
  );
};
