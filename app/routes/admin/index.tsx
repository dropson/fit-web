import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard page" },
    { name: "description", content: "dashboard description!" },
  ];
}

const Dashboard = () => {
  return (
     <div className="dashboard wrapper">
        dashboard content
        </div>
  )
}

export default Dashboard
