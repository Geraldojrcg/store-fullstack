import { Filter, type PageContext } from "adminjs";

import { db } from "@/server/db";

export type DashboardData = {
  resourceCount: {
    name: string | undefined;
    icon: string | undefined;
    count: number;
  }[];
  orderData: {
    monthday: string;
    count: number;
  }[];
};

export const dashboardHandler = async (
  request: unknown,
  response: unknown,
  context: PageContext
): Promise<DashboardData> => {
  const resourceCount = await Promise.all(
    context._admin.resources.map(async (resource) => {
      const filter = new Filter({}, resource);
      const { icon } = resource._decorated?.getNavigation() ?? {};
      return {
        name: resource._decorated?.getResourceName(),
        icon,
        count: await resource.count(filter),
      };
    })
  );

  const orderData = await db.$queryRaw<DashboardData["orderData"]>`
    SELECT
      TO_CHAR("public"."Order"."createdAt", 'mm-dd') AS monthday,
      COUNT(id)::int AS count
    FROM "public"."Order"
    GROUP BY TO_CHAR("public"."Order"."createdAt", 'mm-dd')
    ORDER BY monthday ASC;
  `;

  return {
    resourceCount,
    orderData,
  };
};
