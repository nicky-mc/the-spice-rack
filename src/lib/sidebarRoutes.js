export const sidebarRoutes = () => [
  {
    name: "home",
    icon: "home-16",
    route: "/",
  },
  {
    name: "my profile",
    icon: "person-16",
    route: "/profile/${user?.id}",
  },
  {
    name: "messages",
    icon: "chat-more-20",
    route: "/messages",
  },
];
