const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzE3ODA0ODc1ZmY3M2RkMjIwMWJiMGExOTdkNWQzYyIsIm5iZiI6MTczNTQ4MTc1OS4yNTEwMDAyLCJzdWIiOiI2NzcxNTk5ZjVmMWM0ZmE0NzM2MTU5YzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DaikfTeyRlAu3wL4fK1LdQcw-fyIzH3COdsqaLf8zRM'
import axios from "axios"
import styles from './FetchMovies.module.css'
import notFound from '../assets/notFound.jpg'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const FetchMovies = () => {

    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [nameMovie, setName] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)


    const getMovies = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${nameMovie}&language=pt-BR&page=${page}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setTotalPages(result.data.total_pages)
            setMovies(result.data.results)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPage(1)
        getMovies()
    }

    useEffect(() => {
        if (nameMovie.trim() !== "") {
            getMovies()
        }
    }, [page]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.left}>
                    🎬
                </div>

                <h1 className={styles.title}>Filmes e séries</h1>

                <button
                    className={styles.btnFavoritos}
                    onClick={() => navigate('/favoritos')}
                >
                    ⭐ Favoritos
                </button>
            </header>

            <section className={styles.buscarFilmes}>
                <div className={styles.containerSearch} id="container-search">
                    <form className={styles.formBusca} onSubmit={handleSubmit}>
                        <label htmlFor="input-filme"><h2>Buscar filmes:</h2></label>
                        <input className={styles.inputFilme} type="text" placeholder="Ex: Django" value={nameMovie} onChange={(e) => setName(e.target.value)} />
                        <button className={styles.btnBuscar} id="btnBuscar" type="submit">Buscar</button>
                    </form>
                </div>
            </section>

            {
                loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p> Ocorreu um erro ao requisitar: {error}</p>
                ) :
                    (
                        <>
                            <section id="filmes">
                                <div className={styles.cards} id="cards"
                                    style={{ display: movies.length === 0 ? 'none' : 'grid' }}>{
                                        movies.map((movie) => (
                                            <div key={movie.id} className={styles.card}>
                                                <img src={movie.poster_path === null ? notFound : `https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                                                <h2 id="title">{movie.title}</h2>
                                                <h3 id="data">{movie.release_date}</h3>
                                                <button className={styles.btnDetalhes} onClick={() => navigate(`/detalhes/${movie.id}`)}>Ver detalhes</button>
                                            </div>
                                        ))
                                    }
                                </div>

                                {movies.length > 0 && (
                                    <div className={styles.buttonsPages}>
                                        <button className={styles.btnAnterior} disabled={page === 1} onClick={() => setPage((numberPage) => numberPage - 1)}>Anterior</button>
                                        <button className={styles.btnProximo} disabled={page === totalPages} onClick={() => setPage((numberPage) => numberPage + 1)}>Próximo</button>
                                    </div>
                                )}

                            </section></>
                    )}
        </>
    )
}

export default FetchMovies