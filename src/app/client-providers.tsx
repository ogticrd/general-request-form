"use client";

import { ThemeProvider } from "@/theme";
import { SnackbarProvider } from "notistack";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={10000}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Header />
        {children}
        <Footer />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
