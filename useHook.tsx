import React, { useEffect } from 'react'

const URL = "https://jsonplaceholder.typicode.com"

interface CustomHook {
    fetchTrigger: () => void;
    fetchSuccess: (payload: any) => void;
    fetchError: (paylaod: any) => void;
    params: any;
  }
  

const useHook = (fetchTrigger, fetchSuccess, fetchError, params): CustomHook => {
    useEffect(() => {
        const makeRequest = async() => {
          fetchTrigger()
          try {
            let response = await fetch(`${URL}/${params}`)
            if (response.ok) {
              fetchSuccess(await response.json())
            } else {
              throw new Error('An error occured')
            }
          } catch (error) {
            fetchError(error)
          }
        }
        makeRequest()
      }, []);
}


export default useHook;