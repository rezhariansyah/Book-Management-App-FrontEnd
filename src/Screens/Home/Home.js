import React, { Component } from "react";
import "../../Support/Styles/home.css";
import BorrowModal from "../../Components/Modals/BorrowModal";
import AddModal from "../../Components/Modals/AddModal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllBooks,
  getAllNovel,
  getAllComic,
  getAllScience,
  getAllBiography
} from "../../Publics/Actions/Book";
import { getPagination } from "../../Publics/Actions/pagination";
import Activity from "../../Components/ActivityIndicator/dots";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      numPage: 1,
      Book: [],
      sumPage: "",
      Page : []
    };
  }

  componentDidMount = async () => {
    await this.props.dispatch(getAllBooks());
    this.setState({leng:this.props.Book.bookList.length})
    console.log(this.state.leng);
    
    this.getPagination().then(booklist => {
      this.setState({ Page: this.props.Page, loading: false });
    });
    
  }

  previousPage = () => {
    this.setState(
      {
        numPage: this.state.numPage - 1
      },
      () => {
        this.getPagination().then(booklist => {
          this.setState({ book: this.props.book, loading: false });
        });
      }
    );
  };

  nextPage = () => {
    this.setState(
      {
        numPage: this.state.numPage + 1
      },
      () => {
        this.getPagination().then(bookList => {
          this.setState({ book: this.props.book, loading: false });
        });
      }
    );
  };

  getPagination = async () => {
    await this.props.dispatch(getPagination(this.state.numPage));
  };

  getAllBooks = async () => {
    await this.props.dispatch(getAllBooks());
    this.setState({leng:this.props.Book.bookList.length})
    console.log(this.state.leng);
    
  };

  getAllNovel = async () => {
    await this.props.dispatch(getAllNovel());
  };

  getAllComic = async () => {
    await this.props.dispatch(getAllComic());
  };

  getAllScience = async () => {
    await this.props.dispatch(getAllScience());
  };

  getAllBiography = async () => {
    await this.props.dispatch(getAllBiography());
  };

  renderBookJsx = () => {
    if (this.props.Book.bookList.length > 0) {
      let jsx = this.props.Book.bookList.map(val => {
        return (
          <div key={val.id_book} className="col-md-2 mb-5 mr-5">
            <div
              className="card text-white"
              style={{
                width: "10rem",
                borderColor: "white",
                backgroundColor: "#E1067B"
              }}
            >
              <img
                src={val.img}
                className="image card-img-top cardHome img-fluid"
                alt="..."
              />
              {val.status ? (
                <h6 style={{ display: "inline" }}>
                  <span
                    style={{ padding: "4px" }}
                    className="badge status badge-success"
                  >
                    &nbsp;Available&nbsp;
                  </span>
                </h6>
              ) : (
                <h6 style={{ display: "inline" }}>
                  <span
                    style={{ padding: "4px" }}
                    className="badge status badge-danger"
                  >
                    &nbsp;Borrowed&nbsp;
                  </span>
                </h6>
              )}

              <div className="middle">
                {val.status ? <BorrowModal book={val} /> : ""}

                <Link to={"/bookDetail/" + val.id_book}>
                  <div className="text">
                    <input
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      value="Detail"
                    />
                  </div>
                </Link>
              </div>
              <div className="card-body">
                <h5 className="card-text hiddenTitle">{val.title}</h5>
                <p className="hidden" style={{ fontSize: 12, color: "white" }}>
                  {val.description}
                </p>
              </div>
            </div>
          </div>
        );
      });
      return jsx;
    } else {
      return (
        <div
          key={this.props.Book.bookList.id_book}
          className="col-md-2 mb-5 mr-5"
        >
          <div
            className="card text-white"
            style={{
              width: "10rem",
              borderColor: "white",
              backgroundColor: "#E1067B"
            }}
          >
            <img
              src={this.props.Book.bookList.img}
              className="image card-img-top cardHome img-fluid"
              alt="..."
            />
            <h6>
              <span class="badge badge-success">
                {this.props.Book.bookList.status ? "Available" : "Borrowed"}
              </span>
            </h6>
            <div className="middle">
              <BorrowModal />
              <Link to={"/bookDetail/" + this.props.Book.bookList.id_book}>
                <div className="text">
                  <input
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    value="Detail"
                  />
                </div>
              </Link>
            </div>
            <div className="card-body">
              <h5 className="card-text hiddenTitle">
                {this.props.Book.bookList.title}
              </h5>
              <p className="hidden" style={{ fontSize: 12 }}>
                {this.props.Book.bookList.description}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    console.log(this.state.numPage)
    const sum = Math.ceil(this.state.leng / 6)
    if (this.state.loading) {
      return <Activity />;
    }
    return (
      <div className="wrap">
        <div
          className="jumbotron"
          style={{
            backgroundImage: `url('https://www.dorsetcouncil.gov.uk/CachedImage.axd?ImageName=/image-library/libraries-history-and-culture/libraries/library-banner-images/gillingham-library.jpg&ImageWidth=1400&ImageHeight=1400')`
          }}
        >
          <div className="overlay" />
          <div className="inner">
            <div className="container text-center">
              <h2 className="display-4">
                Welcome to <span style={{ fontWeight: "bolder" }}>Library</span>
              </h2>
              <p style={{ color: "white" }}>
                “There is no friend as loyal as a book.” <br /> - Ernest
                Hemingway
              </p>
              <h3>Search the book here!</h3>
              <div className="row justify-content-center">
                <input
                  type="text"
                  className="form-control mt-3 mb-3 rounded-pill"
                  style={{ width: "500px" }}
                  placeholder="Search..."
                  onChange={this.searchBook}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-1" style={{ paddingRight: "0px" }}>
              <p>
                <b>Categories</b>
              </p>
              <hr />
              <div className="text-left">
                <p className="cursor" onClick={this.getAllBooks}>
                  All
                </p>
                <p className="cursor" onClick={this.getAllNovel}>
                  Novel
                </p>
                <p className="cursor" onClick={this.getAllComic}>
                  Comic
                </p>
                <p className="cursor" onClick={this.getAllScience}>
                  Science
                </p>
                <p className="cursor" onClick={this.getAllBiography}>
                  Biography
                </p>
                <hr />
                <p>
                  <b>Status</b>
                </p>
                <p className="cursor">Borrowed</p>
                <p className="cursor">Available</p>
                <hr />
                <AddModal />
              </div>
            </div>
            <div className="col-lg-10">
              <div className="row justify-content-center">
                {this.renderBookJsx()}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
        {this.state.numPage == 1 ? 
          (<div className="col-md-6 text-right">
          </div>) :
          (<div className="col-md-6 text-center">
            <input
              type="button"
              className="btn btn-outline-danger mr-5"
              onClick={this.previousPage}
              value="Previous"
            />
          </div>)}
          {this.state.numPage == sum ?
          (<div></div>) : (<div className="col-md-6 text-left">
            <input
              type="button"
              className="btn btn-outline-primary"
              onClick={this.nextPage}
              value="Next"
            />
          </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Book: state.Book,
    Page: state.Page
  };
};

export default connect(mapStateToProps)(Home);
