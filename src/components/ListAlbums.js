import React from "react";
import axios from "axios";

class AlbumListing extends React.Component {
  state = {
    albums: []
  };

  componentDidMount() {
    if (window.location.href.indexOf("result") !== -1) {
      const search = window.location.href.split("=")[1];
      axios
        .get("http://localhost:8080/api/api.php?searchAlbum=" + search)
        .then(res => {
          const albums = res.data;
          this.setState({ albums });
        });
    } else {
      axios
        .get("http://localhost:8080/api/api.php?getAlbums=true")
        .then(res => {
          const albums = res.data;
          this.setState({ albums });
        });
    }
  }

  render() {
    return (
      <ul>
        {this.state.albums.map(album => (
          <a href={"/album/" + album.name}>
            <li>{album.name}</li>
          </a>
        ))}
      </ul>
    );
  }
}

function ListAlbums() {
  return (
    <div class="row justify-content-center">
      <div class="col-7 text-center">
        <h1>Albums listing</h1>
        <AlbumListing />
      </div>
    </div>
  );
}

export default ListAlbums;
