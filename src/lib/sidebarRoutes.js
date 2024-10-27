import { faHome, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const sidebarRoutes = () => [
  {
    name: "home",
    icon: faHome,
    route: "/",
  },
  {
    name: "my profile",
    icon: faUser,
    route: "/profile/${user?.id}",
  },
  {
    name: "messages",
    icon: faEnvelope,
    route: "/messages",
  },
];
