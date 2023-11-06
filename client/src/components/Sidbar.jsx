import {
    List,
    ListItemText,
    Divider,
    ListItemButton,
    Typography,
} from '@mui/material'

function Sidebar({ setCategory }) {
    return (
        <div>
            <Typography
                sx={{
                    bgcolor: '#007BFF',
                    color: 'white',
                    padding: 1,
                }}>
                カテゴリ
            </Typography>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton onClick={() => setCategory('all')}>
                    <ListItemText primary="すべて" />
                </ListItemButton>
                <ListItemButton onClick={() => setCategory('movie')}>
                    <ListItemText primary="映画" />
                </ListItemButton>
                <ListItemButton onClick={() => setCategory('tv')}>
                    <ListItemText primary="テレビ" />
                </ListItemButton>
            </List>
            <Divider />
        </div>
    )
}

export default Sidebar
