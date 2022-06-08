import React from 'react'
import GalleryItem from './GalleryItem'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const Gallery = (props) => {
    const data = useContext(DataContext)

    const display = data.map((item, index) => {
        return (
            <GalleryItem item={item} key={item.trackId}/>
        )
    })

    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery