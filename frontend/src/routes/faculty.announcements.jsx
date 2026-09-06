import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementsPage } from "@/components/pages/AnnouncementsPage";

export const Route = createFileRoute("/faculty/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — CampusConnect" },
      {
        name: "description",
        content:
          "Create, edit and publish announcements to students and staff, with priority levels and audience targeting.",
      },
      { property: "og:title", content: "Announcements — CampusConnect" },
      { property: "og:description", content: "Broadcast notices across campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AnnouncementsPage role="faculty" />,
});
