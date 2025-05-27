import { Link } from "react-router-dom";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function EjemploPage() {
  return (
    <DefaultLayout>
      <h1 className={title({ color: "violet", size: "md" })}>Ejemplo Page</h1>
      <p className={subtitle()}>
        Esta es una página de ejemplo usando componentes primitivos
      </p>
      <Link to="/">Volver</Link>
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </AccordionItem>
      </Accordion>
    </DefaultLayout>
  );
}
