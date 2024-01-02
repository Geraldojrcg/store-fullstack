import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  UploadImageEdit: componentLoader.add("UploadImageEdit", "./components/UploadImageEdit.tsx"),
  UploadImageList: componentLoader.add("UploadImageList", "./components/UploadImageList.tsx"),
  UploadImageShow: componentLoader.add("UploadImageShow", "./components/UploadImageShow.tsx"),
  Dashboard: componentLoader.add("Dashboard", "./components/Dashboard.tsx"),
  ProductTableShow: componentLoader.add("ProductTableShow", "./components/ProductTableShow.tsx"),
};

export { componentLoader, Components };
