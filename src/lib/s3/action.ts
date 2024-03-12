"use server";
import userService from "@/lib/user/service";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

import { s3Client } from "./s3client";
import { errorMessage } from "../utils";

const ERROR_MESSAGE = "Error on s3.service.";

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
  try {
    const { data: user } = await userService.getSessionUser();

    if (!user) {
      throw new Error("No user found");
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
      Metadata: {
        userId: user.id,
      },
    });

    const url = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 60,
    });

    return { success: { url, imageUrl: url.split("?")[0] } };
  } catch (error) {
    return errorMessage(error, `${ERROR_MESSAGE}getSignedURL`);
  }
};
