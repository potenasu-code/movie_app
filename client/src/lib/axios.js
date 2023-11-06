// import axios from 'axios'

// //TMDBからのbaseURLリクエストを作成
// const tmdbAxios = axios.create({
//     baseURL: 'https://api.themoviedb.org/3',
// })

// export default tmdbAxios

import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios
