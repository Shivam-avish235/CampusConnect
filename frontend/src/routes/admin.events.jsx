import { createFileRoute } from "@tanstack/react-router";
import { EventsManagerPage } from "@/components/pages/EventsManagerPage";

export const Route = createFileRoute("/admin/events")({
  head: () => ({
    meta: [
      { title: "Manage Events — CampusConnect" },
      {
        name: "description",
        content:
          "Create campus events, open or close registrations and review signup numbers for every event.",
      },
      { property: "og:title", content: "Manage Events — CampusConnect" },
      { property: "og:description", content: "Organise campus events and registrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <EventsManagerPage role="admin" />,
});
