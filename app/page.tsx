import React from "react";
import ClientPage from "./page.client";

export default async function Home() {

  return (
    <main className="min-h-screen w-full max-w-6xl border-x mx-auto">
      <React.Suspense>
        <ClientPage />
      </React.Suspense>
    </main>
  );
}
