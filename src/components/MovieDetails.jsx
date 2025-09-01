import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import styles from './MovieDetails.module.css'
import notFound from '../assets/notFound.jpg'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzE3ODA0ODc1ZmY3M2RkMjIwMWJiMGExOTdkNWQzYyIsIm5iZiI6MTczNTQ4MTc1OS4yNTEwMDAyLCJzdWIiOiI2NzcxNTk5ZjVmMWM0ZmE0NzM2MTU5YzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DaikfTeyRlAu3wL4fK1LdQcw-fyIzH3COdsqaLf8zRM'

const MovieDetails = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)

    const fetchMovieDetails = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const movieResult = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            const creditsResult = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            setMovie(movieResult.data)
            setCredits(creditsResult.data)

            const favorites = JSON.parse(localStorage.getItem("favorites")) || []
            setIsFavorite(favorites.some(movie => movie.id === movieResult.data.id))
        } catch (err) {
            setError('Não foi possível obter os detalhes do filme.')
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchMovieDetails(id)
    }, [id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        let newListMovies

        if (isFavorite) {  //Remoção do Filme dos favoritos
            newListMovies = favorites.filter(movie => movie.id !== movie.id)
            setIsFavorite(false)
        } else {
            //Adição do filme aos favoritos
            newListMovies = [...favorites,
            {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date
            }]
            setIsFavorite(true)
        }
        localStorage.setItem("favorites", JSON.stringify(newListMovies))
    }

    return (
        <div className={styles.container}>
            {loading ? (
                <p className={styles.loading}>Carregando detalhes...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : !movie ? (
                <p className={styles.error}>Filme não encontrado.</p>
            ) : (
                <>
                    <div className={styles.banner}>
                        <img
                            src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : notFound}
                            alt={movie.title}
                        />
                    </div>

                    <div className={styles.details}>
                        <h1>{movie.title}</h1>
                        <p>
                            <strong>Diretor: </strong> 
                            {credits?.crew.find(member => member.job === "Director")?.name || "Indisponível"}
                        </p>
                        <p>
                            <strong>Elenco: </strong> 
                            {credits?.cast.slice(0, 10).map(actors => actors.name).join(", ") || "Indisponível"}
                        </p>
                        <p>
                            <strong>Avaliação: </strong> 
                            {movie.vote_average}
                        </p>
                        <p>
                            <strong>Sinopse: </strong> 
                            {movie.overview}
                        </p>

                        <button className={styles.btnFavorite} onClick={toggleFavorite}>
                            {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieDetails