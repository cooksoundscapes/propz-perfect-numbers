/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"

interface QueryState<T> {
    isLoading: boolean;
    isSuccess: boolean;
    result?: T;
  }

export function useQuery<T>(query: (params?: any) => Promise<T>, params?: any) {
    const [state, setState] = useState<QueryState<T>>({
      isLoading: true,
      isSuccess: false,
    })
  
    useEffect(() => {
      if (!state.result && state.isLoading) {
        query(params).then((result: T) => {
          if (result) {
            setState({
              isLoading: false,
              isSuccess: true,
              result,
            })
          } else {
            setState({
              isLoading: false,
              isSuccess: false,
            })
          }
        })
      }
    }, [params, query, state.result, state.isLoading])
  
  
    return state;
  }