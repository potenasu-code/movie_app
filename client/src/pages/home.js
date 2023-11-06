import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { CardActionArea, CardMedia, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

const Home = () => {
    const [movies, setMovies] = useState([])
    const ImgBaseURL = 'https://image.tmdb.org/t/p/original'

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/getPopularMovies')

                setMovies(response.data.results)
            } catch (error) {
                //現在は詳細なエラー内容を出力していますが、リスクがある為、本番環境では詳細なエラー内容は出力しないようにします。
                console.error(error)
            }
        }
        fetchMovies()
    }, [])

    return (
        <AppLayout
            header={
                // クラスネームを指定することでtailwind.cssのcssが反映されています
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }>
            <Head>
                <title>Laravel - Home</title>
            </Head>

            <SearchBar />
            <Typography variant="h4" component="h1" gutterBottom>
                人気の映画
            </Typography>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    // 320px以上の画面サイズの場合
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    // 480px以上の画面サイズの場合
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    // 640px以上の画面サイズの場合
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    // 768px以上の画面サイズの場合
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                    },
                }}>
                {movies.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <Link href={`detail/movie/${movie.id}`}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        aspectRatio: '2/3',
                                        // filter: 'blur(30px)',
                                    }}
                                    image={`${ImgBaseURL}/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </CardActionArea>
                            <Typography className="release-date">
                                公開日: {movie.release_date}
                            </Typography>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </AppLayout>
    )
}

export default Home
