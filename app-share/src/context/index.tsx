import React, {ReactNode} from "react"
import { AuthProvider } from "./auth-context"
import {QueryClient, QueryClientProvider} from 'react-query';
import { DevTools } from 'jira-dev-tool';
import { Typography } from "antd";
// import styled from "@emotion/styled/types/base";
import styled from "@emotion/styled";

export const AppProvider = ({children} : {children: ReactNode}) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider children={children} />
                {/* {children} */}
            {/* </AuthProvider> */}
        </QueryClientProvider>
    )
    
}


const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageErrorFallback = ({error}: {error:Error | null}) => <FullPage>
        <DevTools />     
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
        </FullPage>