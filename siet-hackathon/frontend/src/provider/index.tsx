"use client"

import React, { Fragment, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster richColors position="bottom-right" closeButton />
    </Fragment>
  );
}
