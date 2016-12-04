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
  }
}

class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Luiz Cezer', body: 'Some comment' },
        { id: 2, author: 'Cezer Luiz', body: 'Some commentssssssssssssssssss' }
      ]
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
        <CommentForm addComment={this._addComment.bind(this)} />
        <hr />
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        {commentsList}
      </div>
    );
  }

  _addComment(author, body) {
    var comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };

    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
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
