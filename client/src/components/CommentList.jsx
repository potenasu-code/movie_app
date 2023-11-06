import React, { useState } from 'react'
import Comment from './Comment'
import { Grid } from '@mui/material'
import laravelAxios from '@/lib/laravelAxios'

const CommentList = ({ comments, setComments }) => {
    const [editMode, setEditMode] = useState(null)
    const [editedContent, setEditedContent] = useState('')

    //編集中の処理
    const handleEdit = comment => {
        setEditMode(comment.id)
        setEditedContent(comment.content)
    }

    // 編集確定ボタンを押したときの処理
    const handleConfirmEdit = async commentId => {
        console.log(editedContent)

        try {
            const response = await laravelAxios.put(
                `api/comments/${commentId}`,
                {
                    content: editedContent,
                },
            )

            const updatedComment = response.data

            // 更新が成功したら、フロントエンドの状態も更新します
            const updatedComments = comments.map(comment => {
                if (comment.id == commentId) {
                    return {
                        ...comment,
                        content: updatedComment.content,
                    }
                }
                return comment
            })

            setComments(updatedComments)
            setEditMode(null)
        } catch (err) {
            console.error(err.response)
        }
    }

    //コメント削除処理
    const handleDelete = async commentId => {
        if (window.confirm('コメントを削除してもよろしいですか？')) {
            try {
                const response = await laravelAxios.delete(
                    `api/comments/${commentId}`,
                )

                console.log(response.data)

                //フロントエンドの状態も更新します
                const FilteredComments = comments.filter(
                    comment => comment.id !== commentId,
                )
                setComments(FilteredComments)
            } catch (err) {
                console.error(err)
            }
        }
    }
    return (
        <>
            {comments.length > 0 && (
                <Grid container spacing={3}>
                    {comments.map(comment => (
                        <Grid item xs={12} key={comment.id}>
                            <Comment
                                comment={comment}
                                onDelete={handleDelete}
                                handleEdit={handleEdit}
                                handleConfirmEdit={handleConfirmEdit}
                                editMode={editMode}
                                editedContent={editedContent}
                                setEditedContent={setEditedContent}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default CommentList
