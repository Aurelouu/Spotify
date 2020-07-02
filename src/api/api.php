<?php

$dbname = "mysql:host=localhost;dbname=database_music";
$usr = "root";
$passw = "root";

try {
  $db = new PDO($dbname, $usr, $passw);
} catch (PDOException $e) {
  echo $e->getMessage();
}

// Get ..
if ($_GET["getAlbums"] === "true") { // .. all albums
  $request = "SELECT `name` FROM albums ORDER BY albums.name ASC;";
  try {
    $sql = $db->prepare($request);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if ($_GET["getArtists"] === "true") { // .. all genres
  $request = "SELECT `name` FROM `artists` ORDER BY artists.name ASC;";
  try {
    $sql = $db->prepare($request);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if ($_GET["getGenres"] === "true") { // .. all genres
  $request = "SELECT * FROM genres ORDER BY genres.name ASC;";
  try {
    $sql = $db->prepare($request);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["getGenre"])) { // .. genre(s) from an album
  $request = "SELECT genres.name 
              FROM genres 
              INNER JOIN genres_albums ON genres.id = genres_albums.genre_id
              INNER JOIN albums ON genres_albums.album_id = albums.id
              WHERE albums.name = :album_name
              ORDER BY genres.name ASC;";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":album_name", $_GET["getGenre"]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["getAlbumFromGenre"])) { // .. album(s) from a genre
  $request = "SELECT albums.name 
              FROM albums 
              INNER JOIN genres_albums ON albums.id = genres_albums.album_id
              INNER JOIN genres ON genres_albums.genre_id = genres.id
              WHERE genres.name = :genre_name
              ORDER BY albums.name ASC;";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":genre_name", $_GET["getAlbumFromGenre"]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["getAlbumFromArtist"])) { // .. album(s) from an artist
  $request = "SELECT albums.name 
              FROM albums 
              INNER JOIN artists ON albums.artist_id = artists.id
              WHERE artists.name = :artist_name
              ORDER BY albums.name ASC;";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":artist_name", $_GET["getAlbumFromArtist"]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["getTracks"])) { // .. tracks from an album
  $request = "SELECT * FROM tracks WHERE album_id = :id;";

  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":id", $_GET["getTracks"]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if ($_GET["getRandomAlbums"] === "true") {
  $request = "SELECT albums.name FROM albums
              ORDER BY RAND()
              LIMIT 10;";
  
  try {
    $sql = $db->prepare($request);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
}

// Looking for ..
if (isset($_GET["searchAlbum"])) { // .. an album
  $request = "SELECT albums.name FROM `albums` WHERE `name` LIKE :album_name ORDER BY albums.name ASC;";
  $name = "%".$_GET["searchAlbum"]."%";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":album_name", $name);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["searchArtist"])) { // .. an artist
  $request = "SELECT artists.name FROM `artists` WHERE `name` LIKE :artist_name ORDER BY artists.name ASC;";
  $name = "%".$_GET["searchArtist"]."%";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":artist_name", $name);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["searchGenre"])) { // .. a genre
  $request = "SELECT genres.name FROM `genres` WHERE `name` LIKE :genre_name ORDER BY genres.name ASC;";
  $name = "%".$_GET["searchGenre"]."%";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":genre_name", $name);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
}

// Looking for ..
if (isset($_GET["album"])) { // .. a specific album
  $request = "SELECT *,
              artists.name as 'artistName', 
              albums.id as 'albumId',
              albums.name as 'albumName',
              albums.description as 'descriptionAlbum'
              FROM `albums` 
              LEFT JOIN artists ON albums.artist_id = artists.id
              WHERE albums.name = :album_name;";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":album_name", $_GET["album"]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["artist"])) { // .. a specific artist
  $request = "SELECT * FROM `artists` WHERE `name` = :artist_name;";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":artist_name", $_GET["artist"]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} else if (isset($_GET["genre"])) { // .. a specific genre
  $request = "SELECT * FROM `genres` WHERE `name` = :genre_name;";
  try {
    $sql = $db->prepare($request);
    $sql->bindParam(":genre_name", $_GET["genre"]);
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
}

try {
  $sql->execute();
  $data = $sql->fetchAll();
} catch (PDOException $e) {
  echo $e->getMessage();
};

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

echo json_encode($data);
