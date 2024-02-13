import axios from 'axios'

const fetchRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1
    const response = await axios.get(`http://localhost:3003/api/pokemon/${randomId}`)
    return response.data.data
  } catch (error) {
    console.error("Error fetching random Pokemon:", error)
    throw error 
  }
}

export { fetchRandomPokemon }