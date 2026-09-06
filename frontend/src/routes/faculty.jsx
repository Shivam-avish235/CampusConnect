import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleGate } from "@/components/layout/RoleGate";

export const Route = createFileRoute("/faculty")({
  component: FacultyLayout,
});

function FacultyLayout() {
  return (
    <RoleGate role="faculty">
      <Outlet />
    </RoleGate>
  );
}
