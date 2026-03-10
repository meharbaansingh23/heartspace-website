import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { WorkshopPage } from "./pages/WorkshopPage";
import { AboutPage } from "./pages/AboutPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "workshop", Component: WorkshopPage },
      { path: "about", Component: AboutPage },
    ],
  },
]);
