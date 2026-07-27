import { ContentType, Genre } from '../enums';
import { Album, Artist, Track } from '../models';

const theWaves: Artist = {
  id: 'artist-1',
  name: 'The Waves',
  imageUrl: '',
  albums: [],
  bio: 'Rock band from the coast',
  mainGenre: Genre.Rock,
  formationYear: 2015,
};
const lunaNova: Artist = {
  id: 'artist-2',
  name: 'Luna Nova',
  imageUrl: '',
  albums: [],
  bio: 'Pop duo with ethereal sound',
  mainGenre: Genre.Pop,
  formationYear: 2018,
};
const echoValley: Artist = {
  id: 'artist-3',
  name: 'Echo Valley',
  imageUrl: '',
  albums: [],
  bio: 'Electronic music producer',
  mainGenre: Genre.Electronic,
  formationYear: 2016,
};
const neonDistrict: Artist = {
  id: 'artist-4',
  name: 'Neon District',
  imageUrl: '',
  albums: [],
  bio: 'Synthwave collective',
  mainGenre: Genre.Electronic,
  formationYear: 2014,
};
const jazzCollective: Artist = {
  id: 'artist-5',
  name: 'Jazz Collective',
  imageUrl: '',
  albums: [],
  bio: 'Jazz ensemble',
  mainGenre: Genre.Jazz,
  formationYear: 2000,
};

const tracks: Track[] = [
  { id: 'track-1', title: 'Ocean Drive', duration: 245, genre: Genre.Rock, artists: [theWaves] },
  {
    id: 'track-2',
    title: 'Electric Dreams',
    duration: 198,
    genre: Genre.Rock,
    artists: [theWaves],
  },
  {
    id: 'track-3',
    title: 'Midnight Static',
    duration: 267,
    genre: Genre.Rock,
    artists: [theWaves],
  },
  { id: 'track-4', title: 'Coastal Wind', duration: 210, genre: Genre.Rock, artists: [theWaves] },
  { id: 'track-5', title: 'Tidepools', duration: 189, genre: Genre.Rock, artists: [theWaves] },
  { id: 'track-6', title: 'Neon Skyline', duration: 203, genre: Genre.Pop, artists: [lunaNova] },
  { id: 'track-7', title: 'Paper Hearts', duration: 187, genre: Genre.Pop, artists: [lunaNova] },
  { id: 'track-8', title: 'Gravity', duration: 221, genre: Genre.Pop, artists: [lunaNova] },
  { id: 'track-9', title: 'Afterglow', duration: 176, genre: Genre.Pop, artists: [lunaNova] },
  { id: 'track-10', title: 'Daydream', duration: 195, genre: Genre.Pop, artists: [lunaNova] },
  { id: 'track-11', title: 'Sunset Blvd', duration: 208, genre: Genre.Pop, artists: [lunaNova] },
  {
    id: 'track-12',
    title: 'Deep Circuits',
    duration: 312,
    genre: Genre.Electronic,
    artists: [echoValley],
  },
  {
    id: 'track-13',
    title: 'Synthetic Rain',
    duration: 289,
    genre: Genre.Electronic,
    artists: [echoValley],
  },
  {
    id: 'track-14',
    title: 'Pulse Grid',
    duration: 254,
    genre: Genre.Electronic,
    artists: [echoValley],
  },
  {
    id: 'track-15',
    title: 'Static Field',
    duration: 233,
    genre: Genre.Electronic,
    artists: [echoValley],
  },
  {
    id: 'track-16',
    title: 'Nightdrive',
    duration: 276,
    genre: Genre.Electronic,
    artists: [neonDistrict],
  },
  {
    id: 'track-17',
    title: 'Chrome Heart',
    duration: 244,
    genre: Genre.Electronic,
    artists: [neonDistrict],
  },
  {
    id: 'track-18',
    title: 'Voltage',
    duration: 260,
    genre: Genre.Electronic,
    artists: [neonDistrict],
  },
  {
    id: 'track-19',
    title: 'Signal Lost',
    duration: 218,
    genre: Genre.Electronic,
    artists: [neonDistrict],
  },
  {
    id: 'track-20',
    title: 'Blackout',
    duration: 231,
    genre: Genre.Electronic,
    artists: [neonDistrict],
  },
  {
    id: 'track-21',
    title: 'Blue Hour',
    duration: 334,
    genre: Genre.Jazz,
    artists: [jazzCollective],
  },
  {
    id: 'track-22',
    title: 'Late Night Sessions',
    duration: 298,
    genre: Genre.Jazz,
    artists: [jazzCollective],
  },
  {
    id: 'track-23',
    title: 'Smoke Signals',
    duration: 271,
    genre: Genre.Jazz,
    artists: [jazzCollective],
  },
  {
    id: 'track-24',
    title: 'Riverside',
    duration: 287,
    genre: Genre.Jazz,
    artists: [jazzCollective],
  },
  {
    id: 'track-25',
    title: 'Autumn Keys',
    duration: 256,
    genre: Genre.Jazz,
    artists: [jazzCollective],
  },
  {
    id: 'track-26',
    title: 'Solstice',
    duration: 302,
    genre: Genre.Jazz,
    artists: [jazzCollective],
  },
];

const album1: Album = {
  id: 'album-1',
  title: 'Electric Dreams',
  type: ContentType.Album,
  artist: theWaves,
  genre: Genre.Rock,
  imageUrl: '',
  releaseDate: new Date('2023-05-15'),
  tracks: [tracks[0], tracks[1], tracks[2]],
};

const album2: Album = {
  id: 'album-2',
  title: 'Coastal',
  type: ContentType.EP,
  artist: theWaves,
  genre: Genre.Rock,
  imageUrl: '',
  releaseDate: new Date('2019-08-02'),
  tracks: [tracks[3], tracks[4]],
};

const album3: Album = {
  id: 'album-3',
  title: 'Neon Skyline',
  type: ContentType.Album,
  artist: lunaNova,
  genre: Genre.Pop,
  imageUrl: '',
  releaseDate: new Date('2021-03-19'),
  tracks: [tracks[5], tracks[6], tracks[7]],
};

const album4: Album = {
  id: 'album-4',
  title: 'Afterglow',
  type: ContentType.Single,
  artist: lunaNova,
  genre: Genre.Pop,
  imageUrl: '',
  releaseDate: new Date('2024-01-26'),
  tracks: [tracks[8]],
};

const album5: Album = {
  id: 'album-5',
  title: 'Daydream',
  type: ContentType.EP,
  artist: lunaNova,
  genre: Genre.Pop,
  imageUrl: '',
  releaseDate: new Date('2016-06-10'),
  tracks: [tracks[9], tracks[10]],
};

const album6: Album = {
  id: 'album-6',
  title: 'Deep Circuits',
  type: ContentType.Album,
  artist: echoValley,
  genre: Genre.Electronic,
  imageUrl: '',
  releaseDate: new Date('2020-11-13'),
  tracks: [tracks[11], tracks[12], tracks[13]],
};

const album7: Album = {
  id: 'album-7',
  title: 'Static Field',
  type: ContentType.Single,
  artist: echoValley,
  genre: Genre.Electronic,
  imageUrl: '',
  releaseDate: new Date('2025-02-14'),
  tracks: [tracks[14]],
};

const album8: Album = {
  id: 'album-8',
  title: 'Nightdrive',
  type: ContentType.Album,
  artist: neonDistrict,
  genre: Genre.Electronic,
  imageUrl: '',
  releaseDate: new Date('2018-09-07'),
  tracks: [tracks[15], tracks[16], tracks[17]],
};

const album9: Album = {
  id: 'album-9',
  title: 'Signal Lost',
  type: ContentType.EP,
  artist: neonDistrict,
  genre: Genre.Electronic,
  imageUrl: '',
  releaseDate: new Date('2022-04-22'),
  tracks: [tracks[18], tracks[19]],
};

const album10: Album = {
  id: 'album-10',
  title: 'Blue Hour',
  type: ContentType.Album,
  artist: jazzCollective,
  genre: Genre.Jazz,
  imageUrl: '',
  releaseDate: new Date('2005-10-01'),
  tracks: [tracks[20], tracks[21], tracks[22]],
};

const album11: Album = {
  id: 'album-11',
  title: 'Riverside',
  type: ContentType.Album,
  artist: jazzCollective,
  genre: Genre.Jazz,
  imageUrl: '',
  releaseDate: new Date('2012-07-18'),
  tracks: [tracks[23], tracks[24]],
};

const album12: Album = {
  id: 'album-12',
  title: 'Solstice',
  type: ContentType.Single,
  artist: jazzCollective,
  genre: Genre.Jazz,
  imageUrl: '',
  releaseDate: new Date('2025-12-05'),
  tracks: [tracks[25]],
};

const album13: Album = {
  id: 'album-13',
  title: 'Night Sessions',
  type: ContentType.EP,
  artist: echoValley,
  genre: Genre.Electronic,
  imageUrl: '',
  releaseDate: new Date('2017-01-30'),
  tracks: [
    {
      id: 'track-27',
      title: 'Night Sessions',
      duration: 240,
      genre: Genre.Electronic,
      artists: [echoValley],
    },
    {
      id: 'track-28',
      title: 'Low Light',
      duration: 225,
      genre: Genre.Electronic,
      artists: [echoValley],
    },
  ],
};

const album14: Album = {
  id: 'album-14',
  title: 'Wavelength',
  type: ContentType.Album,
  artist: theWaves,
  genre: Genre.Rock,
  imageUrl: '',
  releaseDate: new Date('2009-04-11'),
  tracks: [
    { id: 'track-29', title: 'Wavelength', duration: 250, genre: Genre.Rock, artists: [theWaves] },
    { id: 'track-30', title: 'Undertow', duration: 233, genre: Genre.Rock, artists: [theWaves] },
    { id: 'track-31', title: 'Riptide', duration: 219, genre: Genre.Rock, artists: [theWaves] },
  ],
};

theWaves.albums = [album1, album2, album14];
lunaNova.albums = [album3, album4, album5];
echoValley.albums = [album6, album7, album13];
neonDistrict.albums = [album8, album9];
jazzCollective.albums = [album10, album11, album12];

export const MOCK_ALBUMS: Album[] = [
  album1,
  album2,
  album3,
  album4,
  album5,
  album6,
  album7,
  album8,
  album9,
  album10,
  album11,
  album12,
  album13,
  album14,
];

export const MOCK_ARTISTS: Artist[] = [
  theWaves,
  lunaNova,
  echoValley,
  neonDistrict,
  jazzCollective,
];
