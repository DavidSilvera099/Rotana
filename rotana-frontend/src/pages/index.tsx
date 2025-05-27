import { Link } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <h1>Index Page</h1>
      <Link to="/ejemplo">Ejemplo</Link>
    </DefaultLayout>
  );
}
