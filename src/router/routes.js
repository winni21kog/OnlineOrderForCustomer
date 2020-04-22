const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index/Index.vue") },
      { path: "Menu/:id", component: () => import("pages/Menu") },
      { path: "Cart", component: () => import("pages/Cart") },
      { path: "Order/:id", component: () => import("pages/Order") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
