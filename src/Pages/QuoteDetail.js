import { useEffect } from "react";
import { Routes, useParams, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../Hooks/use-http";
import { getSingleQuote } from "../lib/api";
const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;
  const { sendRequest, status, data, error } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!data.text) {
    return <p>No quote Found!</p>;
  }
  // console.log(data);
  // const quote = data.find((quote) => quote.id === params.quoteId);
  // if (!quote) {
  //   return <p>Nooooo quote found!</p>;
  // }
  return (
    <section>
      <HighlightedQuote text={data.text} author={data.author} />
      {/* <button></button> */}
      {/* <Link to="comments">Comments</Link> */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="centered">
              <Link className="btn--flat" to="comments">
                Comments
              </Link>
            </div>
          }
        />
        {/* </Routes> */}

        {/* <Routes> */}
        <Route path="comments" element={<Comments />} />
      </Routes>
    </section>
  );
};
export default QuoteDetail;
