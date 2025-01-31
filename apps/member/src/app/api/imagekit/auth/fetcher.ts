import axios from 'axios'

export const getAuthenticator = async () => {
  const { data } = await axios.get('/api/imagekit/auth')
  return data
}
