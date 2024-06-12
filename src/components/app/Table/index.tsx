import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DataTable from "./Table";

export default function Table() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <DataTable />
    </QueryClientProvider>
  );
}
