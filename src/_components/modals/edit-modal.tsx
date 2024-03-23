"use client";
import * as React from "react";
import { ButtonContainerComponent } from "../container/button-container";
import { ModalComponent } from "../container/modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormLayoutComponent } from "../layout/form-layout";
import { TextFieldComponent } from "../inputs/text-field";
import { MultilineTextFieldComponent } from "../inputs/multiline-text-field";
import { Batch } from "@prisma/client";
import { updateBatchAction } from "@/lib/batch/action";

export const EditModal = ({
  batch,
  backHref,
}: {
  batch: Batch;
  backHref: string;
}) => {
  const { id, name, description } = batch;
  const { push } = useRouter();
  const handleClose = () => push(backHref);

  const update = async (formData: FormData) => {
    toast.promise(updateBatchAction(id, formData), {
      loading: "Modification...",
      success: "Batch modifié",
      error: "Erreur lors de la modification du batch",
    });

    return handleClose();
  };

  return (
    <ModalComponent>
      <FormLayoutComponent
        action={update}
        buttons={
          <ButtonContainerComponent>
            <button className="btn btn-primary" type="submit">
              Modifier
            </button>
            <button
              className="btn btn-neutral"
              onClick={handleClose}
              type="reset"
            >
              Annuler
            </button>
          </ButtonContainerComponent>
        }
      >
        <TextFieldComponent
          label="Nom"
          placeholder="Nom du batch"
          name="name"
          defaultValue={name ?? undefined}
          required
        />
        <MultilineTextFieldComponent
          label="Description"
          placeholder="Courte description du batch"
          name="description"
          defaultValue={description ?? undefined}
        />
      </FormLayoutComponent>
    </ModalComponent>
  );
};
