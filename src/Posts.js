import React, { PropTypes, Component } from 'react'

class Posts extends Component {
  render() {
    return (
      <aside className="menu">
          <ol className="menu-list">
            {this.props.posts.map((post, i) =>
              <li key={i}>{post.title}</li>
            )}
          </ol>
     </aside>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts;
