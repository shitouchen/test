// import { stat } from 'fs';
import React, {useState,useCallback} from 'react';
import { useMountedRef } from '.';


interface State<D>{
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }),[])

    const setError = useCallback((error: Error) => setState({
        error,
        stat:'error',
        data: null
    }),[])
    
    const mountedRef = useMountedRef();
    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    const [retry, setRetry] = useState(()=>() => {})

    // run 用来触发异步请求
    const run = useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
            if(!promise || !promise.then) {
                throw new Error('请传入 Promise 类型数据')
            }
            setRetry(()=> () => {
                if(runConfig?.retry){
                    run(runConfig?.retry(), runConfig)
                }
            }
            )
            setState(prevState => ({...prevState, stat: 'loading'}))
            return promise.then(data => {
                if (mountedRef.current)
                setData(data)
                return data
            }).catch(error => {
                setError(error)
                return error
            })
        },[mountedRef, setData,setError]
    )

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        // retry 被调用时，重新跑一遍run,让state重新刷新一遍
        retry,
        setError,
        ...state
    }
}