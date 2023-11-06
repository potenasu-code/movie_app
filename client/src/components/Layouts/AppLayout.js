import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        backgroundColor: 'pink',
                    },
                },
            },
        },
    })

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>
            <ThemeProvider theme={theme}>
                {/* Page Content */}
                <main>{children}</main>
            </ThemeProvider>
        </div>
    )
}

export default AppLayout
