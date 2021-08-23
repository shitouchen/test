import React, {useState, useEffect} from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
// import * as qs from 'qs';
import {cleanObject, useMount, useDebounce} from "../../utils/index";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import {Typography} from 'antd';
import { useAsync } from "../../utils/use-async";


// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState<null | Error>(null)
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200)
    // const [list, setList] = useState([])
    
    const client = useHttp()
    const {run, isLoading, error, data: list} = useAsync< undefined>()
    useEffect(()=>{
        run( client('projects', {data: cleanObject(debouncedParam)}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[debouncedParam]
    );
    // 初始化用户列表的数据
    useMount(()=>{
        client('users').then(setUsers)
    }
    )
    return  <Container>
        <h2>项目列表</h2>
        <SearchPanel users={users} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : ''}
        <List loading={isLoading} dataSource={list || []} users={users} />
    </Container>
}

const Container = styled.div`
padding: 5rem;
`