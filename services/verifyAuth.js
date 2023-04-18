import axios from 'axios'

export default async function verifyAuth({ req, store }) {
  const { accessToken } = req.cookies
  if (accessToken) {
    try {
      const { data } = await axios.get(`https://shopee-api.deksilp.com/api/auth/user-profile`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      return data
    } catch (err) {
      return null
    }
  } else {
    return null
  }
}
