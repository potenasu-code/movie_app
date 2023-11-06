import CommentList from '@/components/CommentList'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/laravelAxios'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Rating,
    TextField,
    Typography,
} from '@mui/material'

import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Review = () => {
    const router = useRouter()
    const { reviewId } = router.query
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [review, setReview] = useState(null)

    useEffect(() => {
        if (!reviewId) return //reviewIdがundefinedの場合はAPIを呼び出さない
        const fetchReview = async () => {
            try {
                const response = await axios.get(`/api/reviews/${reviewId}`)

                setReview(response.data)
                setComments(response.data.comments)
            } catch (err) {
                console.error(err)
            }
        }

        fetchReview()
    }, [reviewId])

    const handleChange = e => {
        setContent(e.target.value)
    }

    //コメント送信処理
    const handleCommentAdd = async e => {
        e.preventDefault()

        const trimmedContent = content.trim()
        if (!trimmedContent) return

        try {
            const response = await axios.post(`api/comments`, {
                content: trimmedContent,
                review_id: reviewId,
            })

            //フロントエンドの状態も更新します
            const newComment = response.data
            setComments([...comments, newComment])

            // 以下の書き方でもよいです
            // setComments(prevComments => [...prevComments, newComment])

            setContent('')
        } catch (err) {
            console.error(err.response)
        }
    }
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    レビュー詳細画面
                </h2>
            }>
            <Head>
                <title>レビュー詳細画面</title>
            </Head>

            <Container sx={{ py: 2 }}>
                {review ? (
                    <>
                        {/* レビュー内容 */}
                        <Card sx={{ minHeight: '200px' }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    gutterBottom>
                                    {review.user.name}
                                </Typography>

                                <Rating
                                    name="read-only"
                                    value={review.rating}
                                    readOnly></Rating>

                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p">
                                    {review.content}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* 返信用のフォーム */}
                        <Box
                            component="form"
                            onSubmit={handleCommentAdd}
                            noValidate
                            autoComplete="off"
                            p={2}
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'flex-start',
                                bgcolor: 'black',
                            }}>
                            <TextField
                                inputProps={{ maxLength: 200 }}
                                error={content.length > 200}
                                helperText={
                                    content.length > 200
                                        ? '5文字を超えています'
                                        : ''
                                }
                                fullWidth
                                label="comment"
                                variant="outlined"
                                value={content}
                                onChange={handleChange}
                                sx={{ mr: 1, flexGrow: 1 }}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                style={{
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                }}>
                                送信
                            </Button>
                        </Box>

                        {/* コメント一覧 */}
                        <CommentList
                            comments={comments}
                            setComments={setComments}
                        />
                    </>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Container>
        </AppLayout>
    )
}

export default Review
