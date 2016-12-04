class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Delete comment
          </a>
        </div>
      </div>
    );
  }
}

class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false
    };
  }

  render() {
    var buttonText = 'Show comments';
    var comments = this._getComments();
    var commentsList;

    if (this.state.showComments) {
      commentsList = <div className="comment-list">{comments}</div>;
      buttonText = 'Hide comments';
    }

    return(
      <div className="comment-box">
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        {commentsList}
      </div>
    );
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    var commentList = [
      { id: 1, author: 'Luiz Cezer', body: 'Some comment' },
      { id: 2, author: 'Cezer Luiz', body: 'Some commentssssssssssssssssss' }
    ];

    return commentList.map((comment) => {
      return (<Comment author={comment.author} body={comment.body} key={comment.id} />)
    });
  }

  _getCommentsTitle(commentsCount) {
    if (commentsCount == 0) {
      return 'No comments';
    } else if (commentsCount == 1) {
      return '1 Comment';
    } else if (commentsCount > 1) {
      return `${commentsCount} Comments`;
    }
  }
}

ReactDOM.render(
  <CommentBox />, document.getElementById('story-app')
);
