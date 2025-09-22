import { RouterProvider } from "react-router";
import { route } from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={route} />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
