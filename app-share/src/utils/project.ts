import React, {useEffect} from "react";
import { useAsync } from "../utils/use-async";
import { useHttp } from "../utils/http";
import {cleanObject} from '../utils/index'
import { Project } from "../screens/project-list/list";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    
    const {run, ...result} = useAsync<Project[]>()
    useEffect(()=>{
        run( client('projects', {data: cleanObject(param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param]
    );

    return result
}

// export const useEditPropject = (id: number, param: object) => {
    // 在list.ts文件中，useEditProject(project.id, {pin: true})中
    //此种传递props的写法会违反hook的原则，honk必须放在第一层
// }

export const useEditPropject = () => {
    const {run, ...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddPropject = () => {
    const {run, ...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}