import { Box, DropZone, DropZoneItem, Label, type OnDropZoneChange } from "@adminjs/design-system";
import { type BasePropertyProps, type RecordJSON } from "adminjs";
import React, { type FC } from "react";

const UploadImageEdit: FC<BasePropertyProps> = ({ property, record, onChange }) => {
  const onUpload: OnDropZoneChange = (files: File[]) => {
    const newRecord = { ...record };
    onChange?.({
      ...newRecord,
      params: {
        ...newRecord.params,
        [property.name]: files,
      },
    } as RecordJSON);
  };

  const key = (property.custom?.filePathProperty as string) ?? "";
  const uploadedPhoto = record?.params[key];
  const photoToUpload = record?.params[property.name];

  return (
    <Box marginBottom={20}>
      <Label>{property.label}</Label>
      <DropZone
        onChange={onUpload}
        validate={{ mimeTypes: ["image/png", "image/jpg", "image/jpeg"] }}
      />
      {uploadedPhoto && !photoToUpload && <DropZoneItem src={uploadedPhoto} />}
    </Box>
  );
};

export default UploadImageEdit;
