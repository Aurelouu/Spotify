import React from "react";
import axios from "axios";

class ArtistListing extends React.Component {
  state = {
    artists: []
  };

  componentDidMount() {
    if (window.location.href.indexOf("result") !== -1) {
      const search = window.location.href.split("=")[1];
      axios
        .get("http://localhost:8080/api/api.php?searchArtist=" + search)
        .then(res => {
          const artists = res.data;
          this.setState({ artists });
        });
    } else {
      axios
        .get("http://localhost:8080/api/api.php?getArtists=true")
        .then(res => {
          const artists = res.data;
          this.setState({ artists });
        });
    }
  }

  render() {
    return (
      <ul>
        {this.state.artists.map(artist => (
          <a href={"/artist/" + artist.name}>
            <li>{artist.name}</li>
          </a>
        ))}
      </ul>
    );
  }
}

function ListArtists() {
  return (
    <div class="row justify-content-center">
      <div class="col-7 text-center">
        <h1>Artists listing</h1>
        <ArtistListing />
      </div>
    </div>
  );
}

export default ListArtists;
