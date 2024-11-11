const song = [
  { name: "be alright.mp3", artist: "Dean Lewis" },
  { name: "hurtless.mp3", artist: "Dean Lewis" },
  { name: "Little do you know.mp3", artist: "Alex & Sierra" },
  { name: "A Thousand Years.mp3", artist: "Christina Perri" },
  { name: "I Think I'm In Love.mp3", artist: "Kylie Minogue" },
  { name: "Make You Mine.mp3", artist: "MisterWives" },
  { name: "SOMEONE YOU LOVED.mp3", artist: "Lewis Capaldi" },
  { name: "Stitches.mp3", artist: "Shawn Mendes" },
  { name: "Teenage Dream.mp3", artist: "Katy Perry" },
  { name: "Those Eyes.mp3", artist: "Maggie Rogers" },
  { name: "Another Love.mp3", artist: "Tom Odell" },
  { name: "Mockingbird.mp3", artist: "Eminem" },
  { name: "Let Her Go.mp3", artist: "Passenger" },
  { name: "Somewhere Only We Know.mp3", artist: "Keane" },
  { name: "Perfect.mp3", artist: "Ed Sheeran" },
  { name: "Shape of You.mp3", artist: "Ed Sheeran" },
];

export const songs = song.map((file) => {
  const songName = file.name.replace(".mp3", "").replace(/ /g, "%20");
  return {
    name: songName,
    source: `/src/assets/audio/${file.name.replace(/ /g, "%20")}`,
    image: `/src/assets/imagess/${songName}.jpg`,
  };
});

export const artistSongs = song.map((file) => {
  const artistName = file.artist.replace(/ /g, "%20");
  const songName = file.name.replace(".mp3", "").replace(/ /g, "%20");

  return {
    artist: artistName,
    song: songName,
    source: `/src/assets/audio/${file.name.replace(/ /g, "%20")}`,
    albumimg: `/src/assets/artistImg/${artistName}.jpg`,
  };
});
