// class StoryBox extends React.Component {
//   render() {
//     var time = new Date();
//     var languages = ['HTML', 'Golang', 'Ruby', 'JavaScript'];
//
//     return(
//       <div>
//         <h3>Stories App</h3>
//         <p className="lead">Something else</p>
//         <p>Current Time: {time.toTimeString()}</p>
//         <ul>{languages.map( language => <li>{language}</li>)}</ul>
//       </div>
//     )
//   }
// }
//
// ReactDOM.render(
//   <StoryBox />, document.getElementById('story-app')
// );

class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.comment}
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
  render() {
    return(
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">2 comments</h4>
        <div className="comment-list">
          <Comment author="Luiz Cezer" comment="Some comment" />
          <Comment author="Cezer Luiz" comment="Another comment" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox />, document.getElementById('story-app')
);
