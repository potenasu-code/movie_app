// pages/api/searchMedia.js

import axios from 'axios'

export default async (req, res) => {
    const { searchQuery } = req.query

    console.log('検索文字は', searchQuery)

    if (!searchQuery) {
        return res.status(400).json({ message: '検索文字がありません' })
    }

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${
                process.env.TMDB_API_KEY
            }&query=${encodeURIComponent(searchQuery)}&language=ja-JP`,
        )

        console.log('検索結果は', response.data)
        return res.json(response.data)
    } catch (error) {
        console.error('エラー内容は...:', error)

        //エラー内容には機密情報があるかもしれないのでフロントにはエラー内容は返さずメッセージを返す
        return res
            .status(500)
            .json({ message: 'サーバー側でエラーが発生しました' })
    }
}
