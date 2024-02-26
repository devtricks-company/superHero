import { useState, lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import favoriteContext from "./favoriteContext";

const Details = lazy(() => import("./Details"));
const SearchHero = lazy(() => import("./SearchHero"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
    },
  },
});
const App = () => {
  const favoriteList = useState([]);
  return (
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
  );
};

export default App;
