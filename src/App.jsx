import { useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import favoriteContext from "./favoriteContext";

const Details = lazy(() => import("./Details"));
const SearchHero = lazy(() => import("./SearchHero"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  const favoriteList = useState([]);
  return (
    <BrowserRouter>
      <favoriteContext.Provider value={favoriteList}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div>
                <h2 style={{ color: "white" }}>Loading</h2>
              </div>
            }
          >
            <header>
              <h1>Superhero Website</h1>
            </header>
            <Routes>
              <Route path="/" element={<SearchHero />} />
              <Route path="/details">
                <Route path=":id" element={<Details />} />
              </Route>
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </favoriteContext.Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
