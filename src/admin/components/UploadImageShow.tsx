/* eslint-disable @next/next/no-img-element */
import { Box, Label } from "@adminjs/design-system";
import { type BasePropertyProps } from "adminjs";
import React, { type FC } from "react";

const UploadImageShow: FC<BasePropertyProps> = ({ record, property }) => {
  const key = (property.custom?.filePathProperty as string) ?? "";
  const srcImg = record?.params[key];

  return (
    <Box>
      <Label variant="light">{property.label}</Label>
      {srcImg ? <img src={srcImg} width="64px" /> : ""}
    </Box>
  );
};

export default UploadImageShow;
