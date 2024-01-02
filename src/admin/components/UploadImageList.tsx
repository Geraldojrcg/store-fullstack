/* eslint-disable @next/next/no-img-element */
import { Box } from "@adminjs/design-system";
import { type BasePropertyProps } from "adminjs";
import React, { type FC } from "react";

const UploadImageList: FC<BasePropertyProps> = ({ property, record }) => {
  const key = (property.custom?.filePathProperty as string) ?? "";
  const srcImg = record?.params[key];

  return <Box>{srcImg ? <img src={srcImg} width="64px" /> : ""}</Box>;
};

export default UploadImageList;
