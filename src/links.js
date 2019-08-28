import Lending from "views/Lending.jsx";
import Borrowing from "views/Borrowing.jsx";

const dashboardLinks = [
  {
    path: "/lending",
    name: "Lending",
    icon: "pe-7s-bell",
    component: Lending,
    layout: "/admin"
  },
  {
    path: "/borrowing",
    name: "Borrowing",
    icon: "pe-7s-bell",
    component: Borrowing,
    layout: "/admin"
  },
];

export default dashboardLinks;
