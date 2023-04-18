import useSWR from "swr"
import { fetcher } from "@/services/client-side"
import { useSelector } from "react-redux"

export default function getCategory() {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { data, error } = useSWR(isLoggedIn ? `https://shopee-api.deksilp.com/api/get_category_all` : null, fetcher)
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}