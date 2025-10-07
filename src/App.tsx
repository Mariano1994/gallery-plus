import { RouterProvider } from "react-router";
import { route } from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Toaster position="bottom-right" />
        <RouterProvider router={route} />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
