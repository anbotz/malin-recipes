"use client";
import { useRouter } from "next/navigation";
import { uploadImageRecipeAction } from "@/lib/recipe/action";
import { useState } from "react";
import { getSignedURL } from "@/lib/s3/action";
import { FormLayoutComponent } from "../layout/form-layout";
import { UploadButton } from "../buttons/upload-button";
import Image from "next/image";
import { computeSHA256 } from "@/lib/utils";
import { toast } from "sonner";
import { Recipe } from "@prisma/client";
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/s3/upload.const";
import { Alert } from "../alert";

export const UploadImageForm = ({ recipe }: { recipe: Recipe }) => {
  const { back, push } = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const accept = ALLOWED_IMAGE_TYPES.join(",");

  const { id } = recipe;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        return setError("Le fichier est trop lourd (1Mo max)");
      } else if (!ALLOWED_IMAGE_TYPES.find((type) => type === file.type)) {
        return setError("Le ficher n'est pas une image");
      } else {
        setError("");
      }

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

      toast.promise(uploadImageRecipeAction(recipe.id, imageUrl), {
        loading: "Téléversement...",
        success: "Image téléversée",
        error: "Erreur lors du téléversement de l'image",
      });

      return push(`/recipe/${id}`);
    }
  };

  return (
    <FormLayoutComponent
      onSubmit={handleSubmit}
      buttons={
        <>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={
              (file &&
                !ALLOWED_IMAGE_TYPES.find((type) => type === file.type)) ??
              false
            }
          >
            Enregistrer
          </button>
          <button className="btn btn-neutral" onClick={back} type="reset">
            Annuler
          </button>
        </>
      }
    >
      <UploadButton onChange={handleChange} accept={accept} />
      {previewUrl && file && (
        <div>
          {file.type.startsWith("image/") ? (
            <Image
              src={previewUrl}
              alt="Selected file"
              width="0"
              height="0"
              className="w-[200px] h-auto"
            />
          ) : null}
        </div>
      )}
      {error.length > 0 && <Alert variant="error" message={error} />}
    </FormLayoutComponent>
  );
};
