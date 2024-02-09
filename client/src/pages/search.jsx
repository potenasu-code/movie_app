import AppLayout from '@/components/Layouts/AppLayout'
import Layout from '@/components/Layouts/Layout'
import MovieOrTvCard from '@/components/MediaCard'
import Sidebar from '@/components/Sidbar'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const search = () => {
    const router = useRouter()
    const { query: searchQuery } = router.query
    const [results, setResults] = useState([])
    const [category, setCategory] = useState('all') // デフォルトはすべて
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!searchQuery) return
        const fetchMedia = async () => {
            try {
                const response = await axios.get(
                    `/api/searchMedia?searchQuery=${searchQuery}`,
                )
                const searchResults = response.data.results

                const validResults = searchResults.filter(
                    item =>
                        item.media_type === 'movie' || item.media_type === 'tv',
                )
                setResults(validResults)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMedia()
    }, [searchQuery])

    //講義でfirterdResultsという変数名にしていますが、正しくはfilteredResultsです。つづりミスです
    const filteredResults = results.filter(result => {
        if (category === 'all') return true
        return result.media_type === category
    })

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }>
            <Layout sidebar={<Sidebar setCategory={setCategory} />}>
                {/* 検索結果の表示ロジック */}
                {loading ? (
                    <Grid item xs={12} textAlign={'center'}>
                        <Typography>検索中...</Typography>
                    </Grid>
                ) : filteredResults.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredResults.map(media => (
                            <MovieOrTvCard
                                key={media.id}
                                item={media}
                                cardContent={true}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Grid item xs={12} textAlign={'center'}>
                        <Typography>検索結果はありません</Typography>
                    </Grid>
                )}
            </Layout>
        </AppLayout>
    )
}

export default search
