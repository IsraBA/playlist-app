import React from 'react'
import styles from './Song.module.css'

export default function Song(props) {
    return (
        <>
        <div className={styles.imgHolder}><img src={props.image} alt={props.title} /></div>
            <h3 className={styles.title}>{props.title}</h3>
            <div className={styles.author}>{props.author}</div>
        </>
    )
}