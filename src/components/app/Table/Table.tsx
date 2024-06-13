import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { useInView } from "react-intersection-observer";
import AlertDialog from "../AlertDialog";
import EditCreatorDialog from "./EditCreatorDialog";
import AddCreatorDialog from "./AddNewCreatorDialog";
import StatsDialog from "./StatsDialog";
import Button from "../Button";
import LoadingButton from "../LoadingButton";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import type { TData } from "src/types/user";

const DataTable = () => {
  const { ref } = useInView();

  const fetchCreatorsWithPagination = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://gorest.co.in/public/v2/users?page=${pageParam}`
    );
    return response.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchCreatorsWithPagination,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`api/user/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        refetch();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleUpdate = async (updatedCreator: TData) => {
    try {
      const response = await fetch(`api/user/${updatedCreator.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCreator),
      });
      const data = await response.json();
      if (response.ok) {
        refetch();
        toast.success(`Creator ${updatedCreator.name} has been updated.`);
      } else {
        if (data.status === 422) {
          toast.warning("Email has already taken. Please try another email.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleCreate = async (newCreator: Omit<TData, "id">) => {
    console.log(newCreator);
    try {
      const response = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCreator),
      });
      const data = await response.json();
      if (response.ok) {
        refetch();
        toast.success(`Creator ${newCreator.name} has been added.`);
      } else {
        if (data.status === 422) {
          toast.warning(
            "User with this email already exists. Please try another email."
          );
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (status === "pending")
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingButton />
      </div>
    );
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    // <>
    //   <div>
    //     {isFetching && !isFetchingNextPage ? "Updating..." : null}
    //   </div>
    // </>
    <div className="py-10">
      <div className="mx-auto max-w-7xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h4 className=" leading-6 text-gray-900">Manage creators</h4>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none grid gap-2 grid-flow-col">
              <StatsDialog creators={data.pages} />
              <AddCreatorDialog onAdd={handleCreate} />
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="flex flex-col min-w-full py-2 align-middle">
                <div className="overflow-hidden ring-1 ring-[#E3D7D7] ring-opacity-[60%] rounded-md">
                  <table className="min-w-full divide-y divide-[#E3D7D7] divide-opacity-[60%] ">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6 lg:pl-8"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  sm:table-cell"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  lg:table-cell"
                        >
                          Gender
                        </th>
                        <th
                          scope="col"
                          className="border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                        >
                          Available for chat
                        </th>
                        <th
                          scope="col"
                          className="border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4  sm:pr-6 lg:pr-8"
                        >
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.pages.map((page) => (
                        <Fragment key={page.nextId}>
                          {page.map((creator: TData) => (
                            <tr key={creator.id}>
                              <td className="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                {creator.name}
                              </td>
                              <td className="hidden whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {creator.email}
                              </td>
                              <td className="hidden whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 lg:table-cell capitalize">
                                {creator.gender}
                              </td>
                              <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 capitalize">
                                <span
                                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                    creator.status === "active"
                                      ? "text-green-700 bg-green-50 ring-green-600/20"
                                      : "text-red-700 bg-red-50 ring-red-600/20"
                                  } ring-1 ring-inset `}
                                >
                                  {creator.status}
                                </span>
                              </td>
                              <td className="relative whitespace-nowrap grid grid-flow-col gap-4 border-b border-gray-200 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8">
                                <EditCreatorDialog
                                  creator={creator}
                                  onUpdate={handleUpdate}
                                />
                                <AlertDialog
                                  icon="flowbite:trash-bin-solid"
                                  title="Are you absolutely sure?"
                                  description="This action cannot be undone. This will permanently delete this creator from our servers."
                                  confirmButtonText="Yes, remove creator"
                                  onClick={() => {
                                    handleDelete(creator.id);
                                    toast.success(
                                      `Creator ${creator.name} has been removed successfully.`
                                    );
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  // @ts-ignore
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                  variant="secondary"
                  className="mt-4 self-center"
                  size="md"
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load more"
                    : "Nothing more to load"}
                  <Icon icon="lucide:chevron-down" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
