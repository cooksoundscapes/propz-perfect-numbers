/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react"

interface QueryState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  result?: T;
  error?: string
}

export function useQuery<T, P extends any[]>
  (query: (...params: P) => Promise<T>):
  [
    (...params: P) => void,
    QueryState<T>
  ]
{
  const [state, setState] = useState<QueryState<T>>({
    isLoading: false,
    isSuccess: false,
  })

  const toast = useToast()

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        status: 'error',
      })
    }
  }, [state.error, toast])

  const trigger = useCallback((...params: P) => {
    setState(prev => ({ ...prev, isLoading: true }));
    query(...params)
      .then((response: T) => {
        setState({
          result: response,
          isLoading: false,
          isSuccess: true,
        })
      })
      .catch(error => {
        setState({
          isLoading: false,
          isSuccess: false,
          error: error.message
        })
      })
  }, [query])

  return [trigger, state]
}
