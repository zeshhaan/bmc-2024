import { useState, type FormEvent } from "react";
import Dialog from "../Dialog";
import type { TData } from "src/types/user";

const AddCreatorDialog = ({
  onAdd,
}: {
  onAdd: (newCreator: Omit<TData, "id">) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const gender = formData.get("gender") as string;
    const status = formData.get("status") as string;

    onAdd({ name, email, gender, status });
  }
  return (
    <Dialog
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      triggerButton={{
        variant: "primary",
        icon: "material-symbols:add",
        size: "md",
        label: "Add a new creator",
      }}
      modalTitle="Add a new creator"
      modalDescription="Fill in the details below to add a new creator"
    >
      <form className="grid grid-flow-cols gap-4" onSubmit={submit}>
        <fieldset>
          <legend />
          <div className="space-y-2 ">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Creator name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@doe.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
              >
                <option selected>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Available for chat?
          </legend>
          <div className="space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
            <div className="flex items-center">
              <input
                id="active"
                name="status"
                type="radio"
                value="active"
                checked
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="active"
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >
                Active
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="inactive"
                name="status"
                type="radio"
                value="inactive"
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="inactive"
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >
                Inactive
              </label>
            </div>
          </div>
        </fieldset>
        <div className="mt-[25px] flex justify-end">
          <button
            type="submit"
            className="bg-green-100 text-green-700 hover:bg-green-200 focus:shadow-green-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
          >
            Add creator
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddCreatorDialog;
