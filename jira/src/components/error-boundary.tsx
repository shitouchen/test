// 自定义一个异常抛出文件
import React, { ReactNode } from "react";

type FallbackRender = (props: {error: Error | null}) => React.ReactElement
// https://github.com/bvaughn/react-error-boundary error-boundary地址
export class ErrorBoundary extends React.Component<{children:ReactNode, fallbackRender: FallbackRender}, any> {
    state = {error: null}

    // 子组件发生错误后，该方法会接收到并被调用
    static getDerivedStateFromError(error: Error){
        return {error}
    }

    render() {
        const {error} = this.state;
        const {fallbackRender, children} = this.props
        if(error) {
            return fallbackRender({error})
        }
        return children
    }
}