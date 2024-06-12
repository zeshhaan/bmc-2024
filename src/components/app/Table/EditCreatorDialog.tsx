import { useState, type FormEvent } from "react";
import Dialog from "../Dialog";
import type { TData } from "src/types/user";

const EditCreatorDialog = ({ creator }: { creator: TData }) => {
  const [name, setName] = useState(creator.name);
  const [email, setEmail] = useState(creator.email);
  const [gender, setGender] = useState(creator.gender);
  const [status, setStatus] = useState(creator.status);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  async function submit(e: FormEvent<HTMLFormElement>) {}

  return (
    <Dialog
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      triggerButton={{
        variant: "secondary",
        size: "md",
        label: "Edit",
      }}
      modalTitle="Edit creator"
      modalDescription="Edit the creator's information"
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
                value={name}
                onChange={handleNameChange}
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
                value={email}
                onChange={handleEmailChange}
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
                value={gender}
                onChange={handleGenderChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
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
                checked={status === "active"}
                onChange={handleStatusChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                checked={status === "inactive"}
                onChange={handleStatusChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
            Save changes
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default EditCreatorDialog;
