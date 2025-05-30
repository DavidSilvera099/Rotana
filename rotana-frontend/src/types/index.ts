import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


// types/user.d.ts
export type Role = 'admin' | 'users_contractors';
export type Contractor = '3net' | 'eca' | string;

export interface UserData {
  uid: string;
  email: string;
  role: Role;
  contractor?: Contractor;
}


// tipo específico para controlar los pasos del login
export type LoginStep = "email" | "password";