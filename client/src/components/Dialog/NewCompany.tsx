import { useState } from "react";
import useCompanyMutation from "../../service/useCompanyMutation";
import Button from "../general.tsx/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDialog } from "../general.tsx/Dialog";

type FieldValues = {
  name: string;
  description: string;
};

export default function NewCompany() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [isLoading, setIsLoading] = useState(false);
  const { closeDialog } = useDialog();
  const { createMutation } = useCompanyMutation();

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    createMutation.mutate(
      {
        companyName: value.name,
      },
      {
        onSuccess: () => closeDialog(),
      }
    );
    setIsLoading(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-12 pt-12 pb-8 flex items-center justify-center gap-16 rounded-lg"
    >
      <div className="w-[10rem] aspect-square rounded-full bg-slate-200 self-start mt-8"></div>
      <div>
        <div className="mb-6">
          <p className="text-slate-800 font-semibold mb-2">Company Name</p>
          <input
            type="text"
            className="w-full px-4 py-3 border-[1px] border-slate-400 rounded-md mb-2"
            placeholder="Your Company Name"
            {...register("name", { required: true })}
          />
          <p className="text-accent text-sm">Max 20 character</p>
        </div>

        <div className="mb-4">
          <p className="text-slate-800 font-semibold mb-2">Description</p>
          <input
            type="text"
            className="w-full px-4 py-3 border-[1px] border-slate-400 rounded-md mb-2"
            placeholder="Your Company Description"
            {...register("description", { required: true })}
          />
          <p className="text-accent text-sm">Max 50 character</p>
        </div>
        <div className="flex justify-end mt-8">
          <Button
            variant="tertiary"
            className="justify-self-end"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Add +
          </Button>
        </div>
      </div>
    </form>
  );
}
