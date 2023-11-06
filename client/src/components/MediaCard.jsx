import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid,
} from '@mui/material'
import Link from 'next/link'

function MediaCard({ item, isContent }) {
    const imagePath = item.poster_path
        ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
        : '/media_poster_img/NO IMAGE.png'

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea>
                    <Link href={`detail/${item.media_type}/${item.id}`}>
                        <CardMedia
                            component="img"
                            sx={{ aspectRatio: '2/3' /*filter: 'blur(20px)'*/ }}
                            image={imagePath}
                            alt={item.title || item.name}
                        />
                        {isContent && (
                            <CardContent>
                                <Typography variant="h6" component="div" noWrap>
                                    {item.title || item.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary">
                                    {item.release_date || item.first_air_date}
                                </Typography>
                            </CardContent>
                        )}
                    </Link>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default MediaCard
