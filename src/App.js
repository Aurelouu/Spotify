import React from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

import ListAlbums from "./components/ListAlbums";
import ListGenres from "./components/ListGenres";
import ListArtists from "./components/ListArtists";

import Album from "./components/Album";
import Genre from "./components/Genre";
import Artist from "./components/Artist";

import RandomAlbums from "./components/RandomAlbums"

function App() {
  if (window.location.href.indexOf("list-albums") !== -1) {
    return (
      <main class="container-fluid">
        <Header />
        <SearchBar for="album" />
        <ListAlbums />
      </main>
    );
  } else if (window.location.href.indexOf("list-genres") !== -1) {
    return (
      <main class="container-fluid">
        <Header />
        <SearchBar for="genre" />
        <ListGenres />
      </main>
    );
  } else if (window.location.href.indexOf("list-artists") !== -1) {
    return (
      <main class="container-fluid">
        <Header />
        <SearchBar for="artist" />
        <ListArtists />
      </main>
    );
  } else if (window.location.href.indexOf("album") !== -1) {
    const url = window.location.href.split("/");
    const album = decodeURI(url[url.length - 1]);
    return (
      <main class="container-fluid">
        <Header />
        <Album album={album} />
      </main>
    );
  } else if (window.location.href.indexOf("genre") !== -1) {
    const url = window.location.href.split("/");
    const genre = decodeURI(url[url.length - 1]);
    return (
      <main class="container-fluid">
        <Header />
        <Genre genre={genre} />
      </main>
    );
  } else if (window.location.href.indexOf("artist") !== -1) {
    const url = window.location.href.split("/");
    const artist = decodeURI(url[url.length - 1]);
    return (
      <main class="container-fluid">
        <Header />
        <Artist artist={artist} />
      </main>
    );
  } else {
    return (
      <main class="container-fluid">
        <Header />
        <RandomAlbums />
      </main>
    );
  }
}

export default App;
