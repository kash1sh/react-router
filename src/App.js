import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuotes from "./Pages/AllQuotes";
// import NewQuote from "./Pages/NewQuote";
// import QuoteDetail from "./Pages/QuoteDetail";
// import NotFound from "./Pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./Pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./Pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
// const LoadingSpinner = React.lazy(() =>
// import("./components/UI/LoadingSpinner")
// );
function App() {
  return (
    <div>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/quotes" />} />
            <Route path="/quotes" element={<AllQuotes />} />

            <Route path="/quotes/:quoteId/*" element={<QuoteDetail />} />
            <Route path="/new-quote" element={<NewQuote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
