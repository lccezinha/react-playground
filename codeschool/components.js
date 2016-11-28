class StoryBox extends React.Component {
  render() {
    var time = new Date();
    var languages = ['HTML', 'Golang', 'Ruby', 'JavaScript'];

    return(
      <div>
        <h3>Stories App</h3>
        <p className="lead">Something else</p>
        <p>Current Time: {time.toTimeString()}</p>
        <ul>{languages.map( language => <li>{language}</li>)}</ul>
      </div>
    )
  }
}

ReactDOM.render(
  <StoryBox />, document.getElementById('story-app')
);
