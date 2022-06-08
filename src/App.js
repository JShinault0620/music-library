import './App.css';
import { useEffect, useState, useRef} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistsView from './components/ArtistView'
import ArtistView from './components/ArtistView';

function App() {
  let [search, setSearch] = useState('born to be alive')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if(search) {
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(
          API_URL + search
        )
        const resData = await response.json()
        if (resData?.results?.length) {
          setData(resData.results)
          console.log(resData)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className="App">
      {message}
        <Router>
          <Routes>
            <Route path="/" element={
              <div>
                <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
                }}>
                  <SearchBar/>
                </SearchContext.Provider>
                <DataContext.Provider value={data}>
                  <Gallery/>
                </DataContext.Provider>
              </div>
            }/>
            <Route path="/album/:id" element={<AlbumView/>}/>
            <Route path="/artist/:id" element={<ArtistView/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
