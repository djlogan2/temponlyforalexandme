import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

export const authRoutes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
];

export const noAuthRoutes = [
  // {
  //   name: "Register",
  //   path: "/register",
  //   exact: true,
  //   component: SignUp,
  // },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: SignIn,
  },
];
