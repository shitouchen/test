import React from "react";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
// import {Button, Form} from 'antd';
import styled from "@emotion/styled";
import { Dropdown, Menu, Button} from "antd";

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
    const {logout, user} = useAuth()
    return (
    <Container>
        <Header>
            <HeaderLeft>
                <HeaderItem>Logo</HeaderItem>
                <HeaderItem>项目</HeaderItem>
                <HeaderItem>用户</HeaderItem>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={
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
               
            </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
    </Container>          
    );
};

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

