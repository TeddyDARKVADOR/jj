import axios from "axios";

// export const fetchPokemons = async () => {
// 	const response = await axios.get("https://tyradex.vercel.app/api/v1/pokemon");
// 	return response.data;
// };

export const api = axios.create ({
    baseURL: "https://tyradex.vercel.app/api/v1/pokemon",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;
