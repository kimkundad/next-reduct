import axios from 'axios'
import Cookies from 'js-cookie'

export const fetcher = async (url) => {
    const accessToken = Cookies.get('accessToken')
    const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
    return data
  }


  export const login = async ({ phone, password }) => {
    try {
      const { data } = await axios.post('https://shopee-api.deksilp.com/api/login', {
        phone,
        password
      })
      
      const access_token = data.authorisation.token
      Cookies.set('accessToken', access_token, {
        expires: 2
      })
      return data
    } catch (err) {
      return err.response.data
    }
  }


  export const me = async () => {
    try {
      const accessToken = Cookies.get('accessToken')
      
      const { data } = await axios.get(
        'https://shopee-api.deksilp.com/api/auth/user-profile',
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      return data
    } catch (err) {
      logger.error(`GET ME : ${JSON.stringify(err.response.data)}`)
      return err.response.data
    }
  }