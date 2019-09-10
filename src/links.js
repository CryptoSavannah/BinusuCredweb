import Lending from "views/Lending.jsx";
import Borrowing from "views/Borrowing.jsx";
import LendingConfirmDetails from "views/LendingConfirmDetails.jsx";

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
  {
    path: "/confirm_details",
    name: "ConfirmDetails",
    icon: "pe-7s-bell",
    component: LendingConfirmDetails,
    layout: "/admin"
  },
];

export default dashboardLinks;
