import { useAuth } from '@/hooks/auth'
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    TextareaAutosize,
    Typography,
} from '@mui/material'

const Comment = ({
    comment,
    onDelete,
    handleEdit,
    handleConfirmEdit,
    editMode,
    editedContent,
    setEditedContent,
}) => {
    const { user } = useAuth({ middleware: 'auth' })
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {comment.user.name}
                </Typography>

                {/* 編集中だった場合の表示 */}
                {editMode === comment.id ? (
                    <TextareaAutosize
                        value={editedContent}
                        style={{
                            width: '100%', // 幅を100%に設定
                        }}
                        onChange={e => setEditedContent(e.target.value)}
                    />
                ) : (
                    <>
                        {/* 編集中ではない場合の表示 */}
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            gutterBottom
                            paragraph>
                            {comment.content}
                        </Typography>
                    </>
                )}

                {/* 以下のコードにおけるuser?.idは、userオブジェクトがnullまたはundefinedではない場合にのみidプロパティにアクセスすることを意味しています。 */}
                {user?.id === comment.user.id && (
                    <Grid container justifyContent="flex-end">
                        <ButtonGroup>
                            {editMode === comment.id ? (
                                <Button
                                    onClick={() =>
                                        handleConfirmEdit(comment.id)
                                    }>
                                    編集確定
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={() => handleEdit(comment)}>
                                        編集
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => onDelete(comment.id)}>
                                        削除
                                    </Button>
                                </>
                            )}
                        </ButtonGroup>
                    </Grid>
                )}
            </CardContent>
        </Card>
    )
}

export default Comment
