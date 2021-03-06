import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Notifications from "views/Notifications.jsx";
import ChoiceTabs from "views/ChoiceTabs.jsx";

const dashboardRoutes = [
  {
    path: "/choose_track",
    name: "Home",
    icon: "pe-7s-graph",
    component: ChoiceTabs,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Account",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  
  // {
  //   path: "/rankings",
  //   name: "Rankings",
  //   icon: "pe-7s-note2",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/forecasts",
  //   name: "Forecasts",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/admin_settings",
  //   name: "Admin Configuration",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
];

export default dashboardRoutes;
