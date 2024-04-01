"use server";
import userService from "@/lib/user/service";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

import { s3Client } from "./s3client";
import { ServiceResponse } from "@/types/query";

const ERROR_MESSAGE = "S3.service :";

const allowedFileTypes = ["image/jpeg", "image/png"];

const maxFileSize = 1048576 * 10; // 1 MB

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
  key?: string;
};

const generateFileName = (): string => v4();

export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  key,
}: GetSignedURLParams): Promise<
  ServiceResponse<{ url: string; imageUrl: string }>
> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: user } = await userService.getSessionUser();

      if (!allowedFileTypes.includes(fileType)) {
        throw new Error(`${ERROR_MESSAGE} File type not allowed`);
      }

      if (fileSize > maxFileSize) {
        throw new Error(`${ERROR_MESSAGE} File size too large`);
      }

      const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key ?? generateFileName(),
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
        Metadata: {
          userId: user.id,
        },
      });

      const url = await getSignedUrl(s3Client, putObjectCommand, {
        expiresIn: 60,
      });

      resolve({ data: { url, imageUrl: url.split("?")[0] } });
    } catch (error: any) {
      reject(new Error(error.message + " on uploadImageRecipe"));
    }
  });
};
