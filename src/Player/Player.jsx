import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios';
import styles from './Player.module.css'

export default function Player({ url, setUrl, playing, setPlaying, playingRN, videoID}) {

    const [volume, setVolume] = useState(0.5);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [duration, setDuration] = useState(0);
    const [isLiked, setIsLiked] = useState(false)

    // פס התקדמות
    const handleProgress = (progress) => {
        // רק אם המשתמש לא מזיז את פס ההתקדמות הפס מתקדם
        if (!seeking) {
            setPlayed(progress.played);
        }
    };

    // ברגע שהמשתמש מתחיל להזיז את הפס התקדמות ההתקדמות האוטומטית נעצרת
    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekChange = (e) => {
        setPlayed(Number(e.target.value));
    };

    const handleSeekMouseUp = (e) => {
        if (url) {
            const newPlayed = Number(e.target.value);
            setPlayed(newPlayed);
            const newSeekTime = newPlayed * duration;
            // שינוי הזמן של השיר על ידי הקישור
            setUrl(`https://www.youtube.com/watch?v=${videoID}&t=${newSeekTime}`);
            setSeeking(false);
        };
    }
    // תפיסת ההתקדמות של השיר
    const handleDuration = (duration) => {
        setDuration(duration);
    };

    // שליטה בווליום
    const handleVolumeChange = (e) => {
        setVolume(Number(e.target.value));
    };

    // כפתור לייק
    const handleLike = (song) => {
        axios.get('http://localhost:2200/favourites')
        .then((response) => {
            console.log(response);
            if (Object.keys(response.data).every(songID => songID !== song.videoId)) {
                axios.post('http://localhost:2200/favourites', song)
                console.log(song.title + " add to favorites");
            }
            else {
                axios.delete('http://localhost:2200/favourites/' + song.videoId)
                console.log(song.title + " remove from favorites");
            }
        })

    };

    useEffect(() => {
        axios.get('http://localhost:2200/favourites/' + playingRN?.videoId)
        .then((response) => {
            if (response.data) {
                setIsLiked(true);
            }
            else {setIsLiked(false)}
        })
    }, [playingRN])


    return (
        <>
            <div className={styles.video}>
                <ReactPlayer
                    url={url}
                    playing={playing}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    volume={volume}
                />
            </div>
            <div className={styles.songDetails}>
                <div className={styles.imageholder}><img src={playingRN?.thumbnail[0].url} alt="song image" /></div>
                <h4 className={styles.title}>{playingRN?.title}</h4>
            </div>
            <div className={styles.controls}>
                {/* Progress bar */}
                <input className={styles.progressBar}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={played}
                    onChange={handleSeekChange}
                    onMouseDown={handleSeekMouseDown}
                    onMouseUp={handleSeekMouseUp}
                />
                {/* כפתורי שליטה */}
                <div>
                    {/* ווליום */}
                    <span>🔉</span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    {/* כפתור הפעל/השהה */}
                    <button onClick={() => setPlaying(!playing)}>{playing ? "⏸️" : "▶️"}</button>
                    {/* כפתור לייק */}
                    <button onClick={() => handleLike(playingRN)}>{isLiked ? "❤️" : "🤍"}</button>
                </div>
            </div>
        </>
    )
}
