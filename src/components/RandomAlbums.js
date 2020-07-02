import React from "react";
import axios from "axios";

class GetRandomAlbums extends React.Component {
  state = {
    albums: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/api.php?getRandomAlbums=true")
      .then(res => {
        const albums = res.data;
        this.setState({
          albums
        });
      });
  }

  render() {
      return (
        <ul>
  {this.state.albums.map(album => <a href={"/album/"+album.name}><li>{album.name}</li></a>)}
        </ul>
      )
  }
}

function RandomAlbums() {
    return (
        <div class="row justify-content-center">
            <div class="col-7 text-center">
                <h1>Discover</h1>
                <GetRandomAlbums />
            </div>
        </div>
    )
}

export default RandomAlbums;
