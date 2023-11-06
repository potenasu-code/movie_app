import { Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from './Button'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
    const router = useRouter()
    const [query, setQuery] = useState('')

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const searchQuery = async e => {
        e.preventDefault()
        if (!query.trim()) {
            return
        }
        // 特殊文字列などをURL内で安全に扱えるようにエンコードする
        router.push(`/search?query=${encodeURIComponent(query)}`)
    }

    return (
        <Box
            component="form"
            onSubmit={searchQuery}
            sx={{
                width: '80%',
                margin: '3% auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TextField
                variant="filled"
                onChange={handleChange}
                placeholder="作品を探す"
                fullWidth
                sx={{
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    mr: 2,
                }}
            />
            {/* MUIのボタンではなくLaravel Breezeのボタンを使っていることに注意 */}
            <Button type="submit">
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default SearchBar
