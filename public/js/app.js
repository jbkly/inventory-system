// const CommentBox = React.createClass({
//   loadCommentsFromServer: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: data => this.setState({data}),
//       error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
//     });
//   },
//   handleCommentSubmit: function(comment) {
//     // optimistically update UI before hearing back from server
//     var comments = this.state.data;
//     comment.id = Date.now(); // create a temporary id, will be replaced by the server-gen id
//     var newComments = comments.concat([comment]);
//     this.setState({data: newComments});

//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       type: 'POST',
//       data: comment,
//       success: data => this.setState({data}),
//       error: (xhr, status, err) => {r
//         this.setState({data: comments});
//         console.errer(this.props.url, status, err.toString())
//       }
//     });
//   },
//   getInitialState: function() {
//     return {data: []};
//   },
//   componentDidMount: function() {
//     this.loadCommentsFromServer();
//     setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//   },
//   render: function() {
//     return (
//       <div className='CommentBox'>
//         <h1>Comments</h1>
//         <CommentList data={this.state.data} />
//         <CommentForm onCommentSubmit={this.handleCommentSubmit} />
//       </div>
//     );
//   }
// });

// const CommentList = React.createClass({
//   render: function() {
//     var commentNodes = this.props.data.map(function(comment) {
//       return (
//         <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
//       );
//     });
//     return (
//       <div className='commentList'>
//         {commentNodes}
//       </div>
//     );
//   }
// });

// const CommentForm = React.createClass({
//   getInitialState: function() {
//     return {author: '', text: ''};
//   },
//   handleAuthorChange: function(e) {
//     this.setState({author: e.target.value});
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     let author = this.state.author.trim();
//     let text = this.state.text.trim();
//     if (!text || !author) return;
//     this.props.onCommentSubmit({author, text});
//     this.setState({author: '', text: ''});
//   },
//   render: function() {
//     return (
//       <form className='commentForm' onSubmit={this.handleSubmit}>
//         <input
//           type='text'
//           placeholder='Your Name'
//           value={this.state.author}
//           onChange={this.handleAuthorChange}
//         />
//         <input
//           type='text'
//           placeholder='Say something...'
//           value={this.state.text}
//           onChange={this.handleTextChange}
//         />
//         <input type='submit' value='Post' />
//       </form>
//     );
//   }
// });

// const Comment = React.createClass({
//   rawMarkup: function() {
//     var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
//     return { __html: rawMarkup };
//   },
//   render: function() {
//     return (
//       <div className='comment'>
//         <h2 className='commentAuthor'>{this.props.author}</h2>
//         <span dangerouslySetInnerHTML={this.rawMarkup()} />
//       </div>
//     );
//   }
// });

// ReactDOM.render(
//   <CommentBox url='/api/comments' pollInterval={2000} />,
//   document.getElementById('content')
// );
