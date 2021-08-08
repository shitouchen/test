import React, {useEffect, useState} from "react"
export const isFalsy = (value: any) => value === 0 ? false : !value

export const cleanObject = (object: object) => {
    // Object.assign({}, object)
    const result = {...object}
    Object.keys(result).forEach((key: string) => {
        // 0
        // @ts-ignore
        const value = result[key]
        if(isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
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