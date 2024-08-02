import styles from "./CommentList.module.css";
import Comment from "../Comment/Comment";

function CommentList({ comments }) {
  console.log("receiving commentList",comments)
  return (
    <div className={styles.commentListWrapper}>
      <div className={styles.commentList}>
      {comments.length === 0 ? (
          <div className={styles.noComments}>No comments posted</div>
        ) : (
          comments.map((comments) => (
            <Comment key={comments._id} comment={comments} />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentList;
