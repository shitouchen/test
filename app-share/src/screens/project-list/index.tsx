import React, {useState} from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
// import * as qs from 'qs';
import { useMount, useDebounce, useDocumentTitle} from "../../utils/index";
// import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import {Row, Typography, Button} from 'antd';
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/users";
import { useUrlQueryParam } from "../../utils/url";
import { stringify } from "querystring";


// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = (props:{
    // setProjectOpen: (isOpen:boolean)=>void
    projectButton:JSX.Element
}) => {
    const [ param, setParam] = useState({
        name: '',
        personId: ''
    });

    // const [param, setParam] = useUrlQueryParam(['name','personId']);
    // const [keys] = useState<('name' | 'personId')[]>(['name','personId'])
    // const [param] = useUrlQueryParam(keys)
    // const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    // const projectsParam = {...param, personId: Number(param.personId) || undefined}
    const debouncedParam = useDebounce(param, 200);
    const {isLoading, error, data:list, retry} = useProjects(debouncedParam);
    const {data: users} = useUsers();

    useDocumentTitle('项目列表',false);
    
    return  <Container>
        <Row>
        <h2>项目列表</h2>
        {/* <Button onClick={ () => props.setProjectOpen(true)}>创建项目</Button> */}
        {props.projectButton}
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : ''}
        <List 
        refersh={retry} 
        loading={isLoading}
        dataSource={list || []} 
        users={users || []} 
        // setProjectOpen={props.setProjectOpen} 
        projectButton={props.projectButton}
        />
    </Container>
}

const Container = styled.div`
padding: 5rem;
`