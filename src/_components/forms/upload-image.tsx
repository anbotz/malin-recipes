"use client";
import { useRouter } from "next/navigation";
import { uploadImageRecipeAction } from "@/lib/recipe/action";
import Recipe from "@/types/recipe";
import { useState } from "react";
import { getSignedURL } from "@/lib/s3/action";
import { FormLayoutComponent } from "../layout/form-layout";
import { Button } from "@mui/material";
import { UploadButton } from "../buttons/upload-button";
import Image from "next/image";
import { computeSHA256 } from "@/lib/utils";

export const UploadImageForm = ({ recipe }: { recipe: Recipe }) => {
  const { back, push } = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { id } = recipe;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const signedURLResult = await getSignedURL({
        fileSize: file.size,
        fileType: file.type,
        checksum: await computeSHA256(file),
        key: id,
      });

      if (signedURLResult.error !== undefined) {
        console.error(signedURLResult.error);
        return;
      }

      const { data } = signedURLResult;

      if (!data?.url || !data?.imageUrl) {
        throw new Error("No url or imageUrl from S3");
      }

      const { url, imageUrl } = data;

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      await uploadImageRecipeAction(recipe.id, imageUrl);

      return push(`/recipe/${id}`);
    }
  };

  return (
    <FormLayoutComponent
      onSubmit={handleSubmit}
      buttons={
        <>
          <Button variant="contained" type="submit">
            Enregistrer
          </Button>
          <Button variant="contained" color="secondary" onClick={back}>
            Annuler
          </Button>
        </>
      }
    >
      <UploadButton onChange={handleChange} />
      {previewUrl && file && (
        <div>
          {file.type.startsWith("image/") ? (
            <Image
              src={previewUrl}
              alt="Selected file"
              width="200"
              height="200"
            />
          ) : null}
        </div>
      )}
    </FormLayoutComponent>
  );
};
