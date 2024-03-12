"use server";
import { getAuthSession } from "@/lib/auth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

import { s3Client } from "./s3client";

const allowedFileTypes = ["image/jpeg", "image/png"];

const maxFileSize = 1048576 * 10; // 1 MB

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
  key?: string;
};

const generateFileName = (bytes = 32): string => v4();

export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  key,
}: GetSignedURLParams) => {
  const session = await getAuthSession();

  if (!session) {
    return { failure: "not authenticated" };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key ?? generateFileName(),
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    // FIXME
    // Let's also add some metadata which is stored in s3.
    // Metadata: {
    //   userId: session.user.name,
    // },
  });

  const url = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url, imageUrl: url.split("?")[0] } };
};
