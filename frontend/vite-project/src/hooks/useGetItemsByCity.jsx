import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../config.js'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity, setShopsInMyCity } from '../redux/userSlice.js'

function useGetItemsByCity() {
  const dispatch = useDispatch()
  const { city } = useSelector(state => state.user)

  useEffect(() => {
    if (!city) return

    const fetchShop = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-city/${city}`,
          { withCredentials: true }
        )

        console.log("API returned:", result.data)

        dispatch(setItemsInMyCity(result.data))

      } catch (error) {
        console.log("shop fetch error:", error.response?.data || error.message)
      }
    }

    fetchShop()
  }, [city])
}

export default useGetItemsByCity