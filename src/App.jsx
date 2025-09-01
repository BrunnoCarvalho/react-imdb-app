import { BrowserRouter, Routes, Route } from "react-router-dom"
import FetchMovies from "./components/FetchMovies"
import MovieDetails from "./components/MovieDetails"
import FavoritesPage from "./components/FavoritesPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FetchMovies />} />
        <Route path="/detalhes/:id" element={<MovieDetails />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
