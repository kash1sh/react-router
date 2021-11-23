import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import useHttp from "../../Hooks/use-http";
import { addComment } from "../../lib/api";
import classes from "./NewCommentForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const params = useParams();
  // const history = useNavigate();
  // useEffect(() => {
  //   history(`/quotes/${params.quoteId}/comments`);
  // }, [history, params.quoteId]);
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    // optional: Could validate here

    // send comment to server
    // console.log(commentTextRef.current.value);
    // sendRequest(commentTextRef.current.value);
    sendRequest({
      commentData: { text: commentTextRef.current.value },
      quoteId: params.quoteId,
    });
    commentTextRef.current.value = "";
    // console.log(error);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
