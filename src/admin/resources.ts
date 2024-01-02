import { getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import { type FeatureType, type ResourceOptions } from "adminjs";

import { Components } from "./componentLoader";
import { getUploadComponentsAndProps, getUploadFeature } from "./features/upload";
import { loadOrderProducts } from "./handlers/order";

const prisma = new PrismaClient();

type AdminResource = {
  resource: Record<string, unknown>;
  options?: ResourceOptions;
  features?: FeatureType[];
};

export const adminResources: AdminResource[] = [
  {
    resource: {
      model: getModelByName("Order"),
      client: prisma,
    },
    options: {
      navigation: {
        icon: "DollarSign",
      },
      properties: {
        Products: {
          position: 1001,
          components: {
            show: Components.ProductTableShow,
          },
          isVisible: {
            edit: false,
            filter: false,
            list: false,
            show: true,
          },
        },
      },
      actions: {
        show: {
          handler: loadOrderProducts,
        },
      },
    },
  },
  {
    resource: {
      model: getModelByName("Customer"),
      client: prisma,
    },
    options: {
      navigation: {
        icon: "User",
      },
    },
  },
  {
    resource: {
      model: getModelByName("ProductCategory"),
      client: prisma,
    },
    options: {
      navigation: {
        icon: "Grid",
      },
    },
  },
  {
    resource: {
      model: getModelByName("Product"),
      client: prisma,
    },
    options: {
      navigation: {
        icon: "ShoppingBag",
      },
      properties: {
        price: {
          type: "currency",
          props: {
            prefix: "$ ",
            fixedDecimalLength: 2,
          },
        },
        ...getUploadComponentsAndProps({
          file: "Photo",
          key: "imageUrl",
        }),
      },
    },
    features: [
      getUploadFeature({
        file: "Photo",
        key: "imageUrl",
      }),
    ],
  },
];
