import React from "react";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
// import {Button, Form} from 'antd';
import styled from "@emotion/styled";
import { Dropdown, Menu, Button} from "antd";
import {Navigate, Route,  Routes} from 'react-router';
import {BrowserRouter } from 'react-router-dom';
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import {ProjectModal} from '../src/screens/project-list/project-modal';
import { ProjectPopover } from "./components/project-popover";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局还是二维布局
 * 一般来说，一维布局用flex,二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定)，
 * 然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(一般数量比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 * @returns
 */

export const AuthenticatedApp = () => {
    const [projectOpen, setProjectOpen] = React.useState(false);
    return (
    <Container>
        <PageHeader
        projectButton={
            <Button 
            style={{padding:'0'}} 
            type={'link'} 
            onClick={() => setProjectOpen(true)}>创建项目</Button>
        }
        
        // setProjectOpen={setProjectOpen}
        />
        <Main>
            {/* <ProjectListScreen /> */}
            <BrowserRouter>
            <Routes>
                {/* <Route path={"/projects"} element={<ProjectListScreen 
                    setProjectOpen={setProjectOpen} />} /> */}
                <Route path={"/projects"} element={<ProjectListScreen 
                projectButton={
                    <Button 
                    style={{padding:'0'}} 
                    type={'link'} 
                    onClick={() => setProjectOpen(true)}>创建项目</Button>
             } />
        }
        />
                <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                <Navigate to={'/projects'}/>
            </Routes>
            </BrowserRouter>   
            </Main>
            <ProjectModal projectModalOpen={projectOpen} onClose={() => setProjectOpen(false)}></ProjectModal>
    </Container>          
    );
};

const PageHeader = 
// (props:{setProjectOpen: (isOpen:boolean)=>void}) => {
    (props:{projectButton:JSX.Element
    }) => {
    return <Header>
    <HeaderLeft>
        <Button style={{padding:'0'}} type={'link'} onClick={resetRoute}>
        <HeaderItem>Logo</HeaderItem>
        </Button>
        {/* <ProjectPopover setProjectOpen={props.setProjectOpen}/> */}
        <ProjectPopover {...props}/> 
        <HeaderItem>项目</HeaderItem>
        <HeaderItem>用户</HeaderItem>
    </HeaderLeft>
    <HeaderRight>
       <User/>
    </HeaderRight>
    </Header>
}

    const User = () => {
        const {logout, user} = useAuth();
        return <Dropdown overlay={
            <Menu>
                <Menu.Item key={'logout'}>
                    <Button type={'link'} onClick={logout}>登出</Button>
                </Menu.Item>
            </Menu>
        }>
        <Button type={'link'} onClick={e => e.preventDefault()}>
            Hi, {user?.name}
        </Button>
        </Dropdown>
    }

const HeaderItem = styled.h3`magin-right: 3rem`

const Container = styled.div`
    /* display: flex; */
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`;

const Header = styled.header`
    grid-area: header;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 5px 0 rgba(0, 0 , 0, 0.1);
    z-index: 1;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderRight = styled.div``;
const Main = styled.main`
   grid-area: main;
`;

