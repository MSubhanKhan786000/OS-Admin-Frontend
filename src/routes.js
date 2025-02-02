
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Collections from "views/Collections.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Login from "views/login";
import Menu from "views/Menu";
import CheckOut from "views/checkout";
import ProofPaymet from "views/proofpaymet";
var routes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  // {
  //   path: "/",
  //   name: "login",
  //   icon: "nc-icon nc-bank",
  //   component: <Login />,
  //   layout: "/admin",
  // },
  {
    path: "/Login",
    name: "Login",
    icon: "nc-icon nc-single-02",
    component: <Icons />,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  {
    path: "/Earnings",
    name: "Earnings",
    icon: "nc-icon nc-diamond",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Admin Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/Callback",
    name: "Callback",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/Collection",
    name: "Collection",
    icon: "nc-icon nc-tile-56",
    component: <Collections />,
    layout: "/admin",
  },

  {
    path: "/Menu",
    name: "Menu",
    icon: "nc-icon nc-tile-56",
    component: <Menu />,
    layout: "/admin",
  },

  {
    path: "/CheckOut",
    name: "Checkout",
    icon: "nc-icon nc-tile-56",
    component: <CheckOut />,
    layout: "/admin",
  },
  {
    path: "/ProofPaymet",
    name: "ProofPaymet",
    icon: "nc-icon nc-tile-56",
    component: <ProofPaymet />,
    layout: "/admin",
  },

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
