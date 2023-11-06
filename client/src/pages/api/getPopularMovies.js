// pages/api/getPopularMovies.js

import tmdbAxios from '@/lib/axios'

export default async function handler(req, res) {
    try {
        const response = await tmdbAxios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        console.log('取得した結果は...:', response.data)
        res.status(200).json(response.data)
    } catch (error) {
        console.error('Error fetching data:', error)
        res.status(500).json({ error: 'サーバー側でエラーが発生しました' })
    }
}
