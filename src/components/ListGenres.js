import React from "react";
import axios from "axios";

class GenreListing extends React.Component {
  state = {
    genres: []
  };

  componentDidMount() {
    if (window.location.href.indexOf("result") !== -1) {
      const search = window.location.href.split("=")[1];
      axios
        .get("http://localhost:8080/api/api.php?searchGenre=" + search)
        .then(res => {
          const genres = res.data;
          this.setState({ genres });
        });
    } else {
      axios
        .get("http://localhost:8080/api/api.php?getGenres=true")
        .then(res => {
          const genres = res.data;
          this.setState({ genres });
        });
    }
  }

  render() {
    return (
      <ul>
        {this.state.genres.map(genre => (
          <a href={"/genre/" + genre.name}>
            <li>{genre.name}</li>
          </a>
        ))}
      </ul>
    );
  }
}

function ListGenres() {
  return (
    <div class="row justify-content-center">
      <div class="col-7 text-center">
        <h1>Genres listing</h1>
        <GenreListing />
      </div>
    </div>
  );
}

export default ListGenres;
