import { ProjectListScreen } from "screens/project-list";
import React, { useState } from "react";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Dropdown, Menu, Button } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <PageHeader>
        <Header between={true}>
          <HeaderLeft gap={true}>
            <h3>Logo</h3>
            <h3>项目</h3>
            <h3>用户</h3>
          </HeaderLeft>
          <HeaderRight>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key={"logout"}>
                    {/* <Button onClick={logout}>登出</Button> */}
                    <Button type="link" onClick={logout}>
                      登出
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type="link" onClick={(e) => e.preventDefault()}>
                Hi,{user?.name}
              </Button>
            </Dropdown>
          </HeaderRight>
        </Header>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const PageHeader = styled.header`
  height: 6rem;
`;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
