// components/Layout.js

import { Box, Container, Grid } from '@mui/material'
import SearchBar from '../SearchBar'

export default function Layout({ children, sidebar }) {
    return (
        <Container>
            <SearchBar />
            <Grid container spacing={3} py={4}>
                {/* サイドバー */}
                <Grid item xs={12} md={3}>
                    <Box bgcolor="white" boxShadow={1}>
                        {sidebar}
                    </Box>
                </Grid>

                {/* メイン */}
                <Grid item xs={12} md={9}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    )
}
