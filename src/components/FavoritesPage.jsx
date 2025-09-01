import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from './FavoritesPage.module.css'
import notFound from '../assets/notFound.jpg'

const FavoritesPage = () => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(fav)
  }, [])

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Favoritos</h1>
      </header>

      <section id="filmes">
        <div className={styles.cards} style={{ display: favorites.length === 0 ? 'none' : 'grid' }}>
          {favorites.map((movie) => (
            <div key={movie.id} className={styles.card}>
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : notFound} 
                alt={movie.title} 
              />
              <h2 id="title">{movie.title}</h2>
              <h3 id="data">{movie.release_date}</h3>
              <button 
                className={styles.btnDetalhes} 
                onClick={() => navigate(`/detalhes/${movie.id}`)}
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>

        {favorites.length === 0 && (
          <p> Nenhum favorito adicionado. </p>
        )}
      </section>
    </>
  )
}

export default FavoritesPage