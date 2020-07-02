import React from "react";
import axios from "axios";

class GetAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: [],
      genres: [],
      tracks: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/api.php?album=" + this.props.album)
      .then(res => {
        const album = res.data;
        this.setState({ album: album });
        axios
          .get(
            "http://localhost:8080/api/api.php?getTracks=" +
              this.state.album[0].albumId
          )
          .then(res => {
            const tracks = res.data;
            this.setState({ tracks: tracks });
          });
      });
    axios
      .get("http://localhost:8080/api/api.php?getGenre=" + this.props.album)
      .then(res => {
        const genres = res.data;
        this.setState({ genres: genres });
      });
  }

  render() {
    function convertUnixTime(time) {
      const convertDate = new Date(time * 1000);
      const format =
        convertDate.getFullYear() +
        "/" +
        convertDate.getMonth() +
        "/" +
        convertDate.getDate();
      return format;
    }

    return (
      <div>
        {this.state.album.map(property => (
          <div>
            <img src={property.cover} alt="Pensons aux malvoyants" />
            <h3>{property.albumName}</h3>
            <p class="description">
              &laquo; {property.descriptionAlbum} &raquo;
            </p>

            <p>
              Artist:{" "}
              <a href={"/artist/" + property.artistName}>
                {property.artistName}
              </a>
            </p>
            <p>Release date: {convertUnixTime(property.release_date)}</p>
            <h5>Genre(s):</h5>
            <ul>
              {this.state.genres.map(genre => (
                <a href={"/genre/" + genre.name}>
                  <li>{genre.name}</li>
                </a>
              ))}
            </ul>
            <h5>Track(s):</h5>
            {this.state.tracks.map(track => (
              <figure>
                <figcaption>Listen to: {track.name}</figcaption>
                <audio controls src={track.mp3}></audio>
              </figure>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

function Album(props) {
  return (
    <div class="row justify-content-center">
      <div class="col-7 text-center">
        <GetAlbum album={props.album} />
      </div>
    </div>
  );
}

export default Album;
