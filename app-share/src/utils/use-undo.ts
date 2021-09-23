import {useState, useCallback} from  'react';

export const useUndo = <T>(initialPresent: T) => {
    // const [past, setPast] = useState<T[]>([])
    // const [present, setPresent] = useState(initialPresent)
    // const [future, setFuture] = useState<T[]>([])

    // 合并状态
    const [state, setState] = useState<{
        past: T[],
        present:T,
        future:T[]
    }>({
        past: [],
        present: initialPresent,
        future:[]
    })

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => {
        setState(currentState => {
            const {past, present, future} = currentState
            if(past.length === 0) return currentState

        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)

        return{
            past: newPast,
            present: previous,
            future: [present, ...future]
        }
        })
        
    },[])

    // const redo = () => {
    //     if(!canRedo) return

    //     const next = future[0];
    //     const newFuture = future.slice(1);

    //     setPast([...past, present])
    //     setPresent(next)
    //     setFuture(newFuture)
    // }

    // 改写成合并状态
    const redo = useCallback(() => {
        setState(currentState  => {
            const {past, present, future} = currentState
            if(future.length === 0) return currentState

            const next = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        })
    },[])

    // const set = (newPresent: T) => {
    //     if (newPresent === present) {
    //         return 
    //     }

    //     setPast([...past, present])
    //     setPresent(newPresent)
    //     setFuture([])
    // }

    const set = useCallback((newPresent: T) => {
            setState(currentState => {
                const {past, present, future} = currentState
                if (newPresent === present) {
                    return currentState
                }
        
                return{
                    past: [...past, present],
                    present: newPresent,
                    future: []
                } 
            })     
        },[])

    // const reset = (newPresent: T) => {
    //     setPast([])
    //     setPresent(newPresent)
    //     setFuture([])
    // }

    const reset = useCallback((newPresent: T) => {
        setState(() => {
            // const {past, present, future} = currentState
            return{
               past: [],
               present: newPresent,
               future: []
            } 
        })
        
        },[])

    return [
        // {past, present, future},
        state,
        {set, reset, undo, redo, canUndo, canRedo}
    ] as const
}