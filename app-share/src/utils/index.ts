import  {useEffect, useState, useRef} from "react"
export const isFalsy = (value: any) => value === 0 ? false : !value
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: {[key: string]: unknown}) => {
 

    const result = {...object}
    Object.keys(result).forEach((key: string) => {
        
        const value = result[key]
        if(isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
        // eslint-disable-next-line
    }, [])
}

export const useDebounce = <V>(value: V, delay?: number):any => {
    const [debounceValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(()=>setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = useRef(document.title).current;
    // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
    // 返回的 ref 对象在组件的整个生命周期内持续存在。
    // const oldTitle = document.title;
    // 页面加载时：oldTitle === 旧title 'React App'
    // 加载后：oldTitle === 新title
    useEffect(()=>{
        document.title = title;
    },[title])

    // useEffect(() => {
    //     return () => {
    //         if(!keepOnUnmount){
    //             // 如果不指定依赖，读到的就是旧title
    //             document.title = oldTitle;
    //         }
    //     }
    // },[]) // 当监听的状态为空时，会有提示，防止进入闭包的坑

    //对keepOnUnmount 和 title 的状态进行监听，使用useRef
    useEffect(() => {
        return () => {
            if(!keepOnUnmount){
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount,oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */

export const useMountedRef = () => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}