import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import laravelAxios from '@/lib/laravelAxios'
import useSWR from 'swr'
import { Container, Grid, Typography } from '@mui/material'
import MediaCard from '@/components/MediaCard'

const Favorite = () => {
    const fetcher = url =>
        laravelAxios
            .get(url)
            .then(res => res.data)
            .catch(err => {
                throw err.response.data // ここでバックエンドからのエラーレスポンスを投げる
            })

    const { data: favoriteItems, error } = useSWR('/api/favorites', fetcher)
    console.log(favoriteItems)
    if (error) {
        console.error('Error fetching data:', error) // エラーの詳細を表示
        return 'エラーが発生しました'
    }

    // ローディング状態の判断
    const loading = !favoriteItems && !error

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    お気に入り
                </h2>
            }>
            <Head>
                <title>お気に入り</title>
            </Head>

            <Container>
                {loading ? (
                    <Typography textAlign={'center'}>Loading...</Typography>
                ) : favoriteItems.length > 0 ? (
                    <Grid container spacing={3} py={3}>
                        {favoriteItems.map(item => (
                            <MediaCard
                                key={item.id}
                                item={item}
                                isContent={false}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Typography textAlign={'center'}>
                        お気に入りに登録した作品はありません
                    </Typography>
                )}
            </Container>
        </AppLayout>
    )
}

export default Favorite
