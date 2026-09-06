import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/components/pages/NotificationsPage";

export const Route = createFileRoute("/faculty/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CampusConnect" },
      {
        name: "description",
        content:
          "Your faculty notifications across academics, assignments, placements and system updates, with read and unread states.",
      },
      { property: "og:title", content: "Notifications — CampusConnect" },
      {
        property: "og:description",
        content:
          "Your faculty notifications across academics, assignments, placements and system updates, with read and unread states.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <NotificationsPage role="faculty" />,
});
