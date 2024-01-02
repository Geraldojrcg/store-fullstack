import uploadFileFeature, { type MinIoOptions } from "@geraldojrcg/adminjs-upload";

import { Components, componentLoader } from "../componentLoader";

const s3Provider: MinIoOptions = {
  bucket: process.env.S3_BUCKET ?? "",
  endpoint: process.env.S3_URL ?? "",
  accessKeyId: "",
  secretAccessKey: "",
};

export const getUploadFeature = ({ file, key }: { file: string; key: string }) =>
  uploadFileFeature({
    componentLoader,
    provider: { minio: s3Provider },
    multiple: false,
    validation: { mimeTypes: ["image/png", "image/jpg"] },
    properties: {
      file,
      key,
    },
  });

export const getUploadComponentsAndProps = ({ file, key }: { file: string; key: string }) => ({
  [key]: {
    isVisible: {
      edit: false,
      show: false,
      list: false,
      filter: false,
    },
  },
  [file]: {
    components: {
      edit: Components.UploadImageEdit,
      list: Components.UploadImageList,
      show: Components.UploadImageShow,
    },
  },
});
