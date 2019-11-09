import { Form, Spinner, Button } from "react-bootstrap";
import React from "react";
import { connect } from "react-redux";
import {
  createPost,
  newPost,
  updatePost
} from "../../../modules/posts/actions";

class CreatePost extends React.Component {
  /**
   * State
   */
  state = {
    userId: "",
    title: "",
    body: ""
  };

  /**
   * component mount
   */
  componentDidMount() {
    const { post } = this.props;

    this.setState({
      ...post
    });
    //console.log(this.props);
  }

  /**
   * Handle Submit
   */
  handleSubmit = e => {
    e.preventDefault();
    const { userId, title, body } = this.state;
    const { post } = this.props;

    let postBody = {
      userId: userId,
      title: title,
      body: body
    };
    this.props.newPost(postBody);
    if (post.id) {
      this.props.updatePost(post.id);
    } else {
      this.props.createPost();
    }

    //this.props.newPost();
  };

  /**
   * Render
   */
  render() {
    const { is_adding, post } = this.props;
    const { userId, title, body } = this.state;
    if (is_adding) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    let button = "submit";
    if (post.id) {
      button = "update";
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="number"
              placeholder="Please enter number"
              value={userId}
              onChange={e => this.setState({ userId: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Please enter title"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              value={body}
              placeholder="Please enter body"
              onChange={e => this.setState({ body: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {button}
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { is_adding, post } = state.posts;
  return {
    is_adding: is_adding,
    post: post
  };
};

export default connect(
  mapStateToProps,
  {
    createPost,
    newPost,
    updatePost
  }
)(CreatePost);
