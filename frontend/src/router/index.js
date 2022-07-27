import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/users/SignUpView.vue";
import SignIn from "../views/users/SignInView.vue";
import ProfilePage from "../views/users/ProfileView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    props: true,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
    props: true,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
