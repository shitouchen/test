

import React from 'react';
import { useAuth } from '../../context/auth-context';
import { Form, Input, } from 'antd';
import { LongButton } from '.';

export const LoginScreen = ({onError}:{onError:(error:Error) => void}) => {
    const {login,} = useAuth()
    //  .catch在异步执行完后才执行；try catch在try异步调用时，就开始调用，异步还未执行完，所以
    // onerror捕获不到错误，要加async 和await
    const handleSubmit = async (values: {username:string, password:string}) => {
        try{
            await login(values)
        }catch(e:any){
            onError(e)
        }
    } 
    return <Form onFinish={handleSubmit}>
        <Form.Item 
        label='用户名'
        name='username'
        rules={[{required:true, message:'请输入用户名'}]}
        >
            <Input placeholder={'用户名'} type='text' id={'username'} />
        </Form.Item>
        <Form.Item
        label='密码'
        name='password'
        rules={[{required:true, message:'请输入密码'}]}
        >
        <Input.Password id={'password'} />
        </Form.Item>
        <Form.Item>
            <LongButton type='primary' htmlType='submit'>登录</LongButton>
        </Form.Item>     
    </Form>
}