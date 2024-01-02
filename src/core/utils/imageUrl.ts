export const getImageUrl = (path: string | null) =>
  `${process.env.NEXT_PUBLIC_S3_URL}/${process.env.NEXT_PUBLIC_S3_BUCKET}/${path}`;
