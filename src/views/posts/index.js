import { Table, Spinner, ButtonToolbar, Button, Modal, Alert } from "react-bootstrap";
import React from "react";
import {
  fetchPosts,
  deletePost,
  newPost,
  editPost
} from "../../modules/posts/actions";
import { connect } from "react-redux";

class Posts extends React.Component {
  /**
   * State
   */
  state = {
    modal: false,
    alert:false,
    alertMessage:""
  };

  /**
   * component mount
   */
  componentDidMount() {
    setTimeout(() => this.props.fetchPosts(), 300);
    // this.props.newPost();
  }

  /**
   * Handle delete
   */
  handleDelete = () => {
    const { id } = this.state;
    this.setState({ modal: false });
    this.props.deletePost(id);
    setTimeout(
      () => this.setState({ alert: true, alertMessage: "Deleted" }),
      1000
    );
  };

  /**
   *
   */
  handleEdit = id => {
    this.props.editPost(id);
    setTimeout(() => this.props.history.push("/create_post"), 1000);
  };

  /**
   * Render
   */
  render() {
    const { is_fetching, posts, is_adding } = this.props;
    const { modal, alert, alertMessage } = this.state;

    if (is_fetching || is_adding) {
      return (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }

    return (
      <div>
        {alert && <Alert variant="success">{alertMessage} successfully.</Alert>}
        <Modal show={modal} onHide={() => this.setState({ modal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to delete this!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ modal: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          <ButtonToolbar>
            <Button
              onClick={() => this.props.history.push("/create_post")}
              variant="primary"
            >
              Create Post
            </Button>
          </ButtonToolbar>
        </div>
        <div style={{ margin: "10px" }}></div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!is_fetching &&
              posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <ButtonToolbar>
                      <Button
                        size="sm"
                        onClick={() => this.handleEdit(post.id)}
                        variant="secondary"
                      >
                        Edit
                      </Button>
                      |
                      <Button
                        size="sm"
                        onClick={() =>
                          this.setState({ modal: true, id: post.id })
                        }
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  is_fetching: state.posts.is_fetching,
  is_adding: state.posts.is_adding
});

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost, newPost, editPost }
)(Posts);
