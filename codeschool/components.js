class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.comment.author}</p>
        <p className="comment-body">
          {this.props.comment.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete comment
          </a>
        </div>
      </div>
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    if (confirm('Delete ?')) {
      this.props.onDelete(this.props.comment);
    }
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input placeholder="Your name" ref={(input) => this._author = input}/><br />
          <textarea placeholder="Your comment" ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post comment</button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    var author = this._author;
    var body = this._body;

    this.props.addComment(author.value, body.value);

    author.value = '';
    body.value = '';
  }
}

class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentWillMount() {
    this._fetchComments();
  }

  componentDidMount() {
    this._timer = setInterval(
      () => this._fetchComments(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
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
        <CommentForm addComment={this._addComment.bind(this)} />
        <hr />
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        {commentsList}
      </div>
    );
  }

  _addComment(author, body) {
    var comment = { author, body };

    jQuery.ajax({
      method: 'POST',
      url: 'http://localhost:8001/comments/create',
      data: comment,
      success: (newComment) => {
        this.setState({ comments: this.state.comments.concat([newComment]) });
      }
    });
  }

  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: 'http://localhost:8001/comments',
      success: (comments) => {
        this.setState({ comments })
      }
    });
  }

  _deleteComment(comment) {
    jQuery.ajax({
      method: 'DELETE',
      url: `http://localhost:8001/comments/${comment.id}`
    })

    var comments = [...this.state.comments];
    var commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, 1);

    this.setState({ comments });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={this._deleteComment.bind(this)} />
      );
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
