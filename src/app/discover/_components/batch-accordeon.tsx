import { Batch } from "@prisma/client";
import { DateTime } from "luxon";
import { EnterButton } from "./enter-button";
import Badges from "@/_components/badges";

const BatchAccordeon = ({ batch }: { batch: Batch }) => {
  const { id, createdAt, creator, name, recipeNames, recipeIds, description } =
    batch;
  const createAtLocalString = DateTime.fromJSDate(createdAt)
    .setLocale("fr")
    .toLocaleString();
  const week = DateTime.fromJSDate(createdAt).weekNumber;

  const subtitle = `Créé par ${creator ?? "Malin"} le ${createAtLocalString}`;
  const recipes = recipeNames.length === 0 ? recipeIds : recipeNames;

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div className="collapse-title text-xl font-medium flex flex-row">
        <div>
          <div className="avatar placeholder mr-3">
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span>{week}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="line-clamp-1">{name ?? subtitle}</span>
          <div className="italic text-base line-clamp-3">{description}</div>
        </div>
      </div>
      <div className="collapse-content flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col">
          <span className="badge badge-neutral mb-3 truncate">{subtitle}</span>
          <Badges items={recipes} />
        </div>
        <div className="flex justify-end mt-3">
          <EnterButton batchId={id} />
        </div>
      </div>
    </div>
  );
};

export default BatchAccordeon;
