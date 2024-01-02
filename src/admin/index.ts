import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/prisma";
import AdminJS from "adminjs";
import { type Express } from "express";

import { Components, componentLoader } from "./componentLoader";
import { authProvider } from "./features/authentication";
import { dashboardHandler } from "./handlers/dashboard";
import { adminResources } from "./resources";

AdminJS.registerAdapter({ Database, Resource });

const admin = new AdminJS({
  resources: adminResources,
  componentLoader,
  branding: {
    companyName: "Store Admin",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    withMadeWithLove: true,
  },
  assets: {
    styles: ["/styles/style.css"],
  },
  dashboard: {
    component: Components.Dashboard,
    handler: dashboardHandler,
  },
});

export function startAdmin(app: Express) {
  const router =
    process.env.NODE_ENV === "development"
      ? AdminJSExpress.buildRouter(admin)
      : AdminJSExpress.buildAuthenticatedRouter(
          admin,
          {
            cookiePassword: "admin321",
            provider: authProvider,
          },
          null,
          {
            secret: "123#321",
            resave: true,
            saveUninitialized: true,
          }
        );

  app.use(admin.options.rootPath, router);
}
