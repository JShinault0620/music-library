import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    useEffect(() => {
        const API_URL = `http://localhost:3006/album/${id}`
        const fetchData = async () => {
            const res = await fetch(API_URL)
            const resData = await res.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    return (
        <div>
            {renderAlbums}
        </div>
    )
}

export default ArtistView