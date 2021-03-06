import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label
} from "reactstrap";
import { connect } from "react-redux";
import { addBook } from "../../Publics/Actions/Book";
import swal from "sweetalert";

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      file: null
    };

    this.toggle = this.toggle.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  onChangeFile = e => {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  addBook = async () => {
    const dataFile = new FormData();
    dataFile.append("img", this.state.file);
    dataFile.append("title", this.state.title);
    dataFile.append("writer", this.state.writer);
    dataFile.append("description", this.state.description);
    dataFile.append("id_category", this.refs.selected.value);

    await this.props.dispatch(addBook(dataFile));
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    swal({
      title: "Add Book Success",
      text: "Please refresh the page!",
      icon: "success",
      button: "gotcha!!!"
    }).then(function() {
      window.location = "/";
    });
  };

  render() {
    return (
      <div>
        {localStorage.role == "admin" ? (
          <input
            type="button"
            onClick={this.toggle}
            className="btn btn-outline-success mb-2"
            value="Add Book"
          >
            {this.props.buttonLabel}
          </input>
        ) : (
          <input
            type="button"
            onClick={this.toggle}
            className="btn btn-outline-success mb-2"
            value="Donate"
          >
            {this.props.buttonLabel}
          </input>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Book</ModalHeader>
          <ModalBody>
            <Form>
              <Label>Book Title</Label>
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={e => this.setState({ title: e.target.value })}
              />
              <Label className="mt-2">Writer</Label>
              <input
                type="text"
                className="form-control"
                id="writer"
                onChange={e => this.setState({ writer: e.target.value })}
              />
              <Label className="mt-2">Category</Label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Options
                  </label>
                </div>
                <select className="custom-select" ref="selected">
                  <option selected>Choose...</option>
                  <option
                    value={1}
                    id="novel"
                    onChange={e => this.setState({ novel: e.target.value })}
                  >
                    Novel
                  </option>
                  <option
                    value={2}
                    id="comic"
                    onChange={e => this.setState({ comic: e.target.value })}
                  >
                    Comic
                  </option>
                  <option
                    value={3}
                    id="science"
                    onChange={e => this.setState({ science: e.target.value })}
                  >
                    Science
                  </option>
                  <option
                    value={4}
                    id="biography"
                    onChange={e => this.setState({ biography: e.target.value })}
                  >
                    Biography
                  </option>
                </select>
              </div>
              <Label className="mt-2">Cover Image</Label>
              <input
                type="file"
                className="form-control"
                id="img"
                onChange={this.onChangeFile}
              />
              <Label className="mt-2">description</Label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={e => this.setState({ description: e.target.value })}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  };
};

export default connect(mapStateToProps)(AddModal);
