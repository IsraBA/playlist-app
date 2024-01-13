import './App.css'
import Song from './Song/Song'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './Search/Search'
import Player from './Player/Player'

function App() {

  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("Alan Walker");
  const [songs, setSongs] = useState([]);
  const [videoID, setVideoID] = useState();
  const [playing, setPlaying] = useState(false);
  const [playingRN, setPlayingRN] = useState();


  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://yt-api.p.rapidapi.com/search',
      params: { query: search },
      headers: {
        'X-RapidAPI-Key': '826affbe00msh3830eafc52f24d2p143148jsndc341961ab06',
        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
      }
    };

    axios.get(`${options.url}?query=${options.params.query}`, { headers: options.headers })
      .then(obj => {
        const newSongs = obj.data.data;
        console.log(newSongs);
        setSongs(newSongs);
      });
  }, [search])

  // console.log(songs);

  return (
    <div className='app'>
      <Search setSearch={setSearch} />
      <ul className={url ? 'songs playerOn' : 'songs'} >
        {songs.filter(song => song.type === "video").map(song => {
          return (
            <li key={song.videoId}
              onClick={() => {
                setUrl("https://www.youtube.com/watch?v=" + song.videoId);
                setVideoID(song.videoId);
                setPlaying(true);
                setPlayingRN(song);
              }}
            >
              <Song
                title={song.title}
                author={song.channelTitle}
                image={song.thumbnail[0].url}
                link={song.videoId}
                song={song}
              />
            </li>)
        })}
      </ul>
      <div className={url ? "player vis" : "player"}>
        <Player
          url={url}
          setUrl={setUrl}
          playing={playing}
          setPlaying={setPlaying}
          playingRN={playingRN}
          videoID={videoID}
        />
      </div>
    </div>
  )
}

export default App
