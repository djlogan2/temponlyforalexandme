import Chats from "./pages/Chats";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

export const authRoutes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
  {
    name: "Chats",
    path: "/chats",
    exact: true,
    component: Chats,
  },
  {
    name: "Chats",
    path: "/chats/:id",
    exact: true,
    component: Chats,
  },
];

export const noAuthRoutes = [
  {
    name: "Register",
    path: "/register",
    exact: true,
    component: SignUp,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: SignIn,
  },
];
