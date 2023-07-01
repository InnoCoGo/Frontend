import { useState, useEffect } from 'react'

// Based on https://medium.com/swlh/usefetch-a-custom-react-hook-36d5f5819d8
function useFetch<T>(initialUrl:string, params:string, method:string, skip = false) {
    const [url, updateUrl] = useState(initialUrl)
    const [data, setData] = useState<T|null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [refetchIndex, setRefetchIndex] = useState(0)
    const refetch = () => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1)
    useEffect(() => {
        const fetchData = async () => {
            if (skip) return
            setIsLoading(true)
            try {

                const response = await fetch(`${url}`, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    body: params
                });
                const result = await response.json()
                if (response.ok) {
                    setData(result)
                } else {
                    setHasError(true)
                    setErrorMessage(result)
                }
            } catch (err) {
                console.log(`Error caught: ${err}`)
                setHasError(true)
                // TODO: better typing
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setErrorMessage(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url, params, refetchIndex])
    return { data, isLoading, hasError, errorMessage, updateUrl, refetch }
}

export default useFetch