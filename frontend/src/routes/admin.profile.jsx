import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/pages/ProfilePage";

export const Route = createFileRoute("/admin/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — CampusConnect" },
      {
        name: "description",
        content:
          "View and update your CampusConnect admin account details, contact information and password.",
      },
      { property: "og:title", content: "My Profile — CampusConnect" },
      {
        property: "og:description",
        content:
          "View and update your CampusConnect admin account details, contact information and password.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});
