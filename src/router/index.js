import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: () => import("@/components/login/login"),
  },
  {
    path: "/home",
    component: () => import("@/view/home"),
  },
  {
    path: "/preview",
    component: () => import("@/view/preview"),
  },
  {
    path: "/writeArtical",
    component: () => import("@/view/writeArtical"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/yudioll",
  routes,
});

router.beforeEach((to, from, next) => {
  const token =
    localStorage.getItem("yudioll") &&
    JSON.parse(localStorage.getItem("yudioll")).login.token;
  if (token) {
    next();
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
