import axios from 'axios'
import Cookies from 'js-cookie'

export default async function logout() {
  try {
    const accessToken = Cookies.get('accessToken')
    const { data } = await axios.get(
      'https://shopee-api.deksilp.com/api/logout',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    Cookies.remove('accessToken')
    return data
  } catch (err) {
    return err.response.data
  }
}
