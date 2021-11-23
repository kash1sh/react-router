import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../Hooks/use-http";
import { addQuote } from "../lib/api";
const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useNavigate();
  useEffect(() => {
    if (status === "completed") {
      history("/quotes");
    }
  }, [status, history]);
  const AddQuoteHandler = (quoteData) => {
    // console.log(quoteData);
    sendRequest(quoteData);
    // history.push("/quotes");
    // history("/quotes");
  };
  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={AddQuoteHandler} />
  );
};
export default NewQuote;
