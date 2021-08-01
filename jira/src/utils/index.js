import React, {useEffect, useState} from "react"
export const isFalsy = (value) => value === 0 ? false : !value

export const cleanObject = (object) => {
    // Object.assign({}, object)
    const result = {...object}
    Object.keys(result).forEach(key => {
        // 0
        const value = result[key]
        if(isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(()=>setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue
}