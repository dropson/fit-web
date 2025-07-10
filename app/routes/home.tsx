import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fit Rave app" },
    { name: "description", content: "Welcome to Fit rave app!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
