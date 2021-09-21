// import { setMaxListeners } from 'process';
// import { stringify } from 'qs';

import React from 'react';
import { useAuth } from '../../context/auth-context';
import {  Form, Input } from 'antd';

import { LongButton } from '.';

export const RegisterScreen = ({onError}:{onError:(error:Error) => void}) => {
    const {register} = useAuth()
    const handleSubmit = async ({cpassword, ...values}: {username:string, password:string, cpassword:string}) => {
        if(cpassword !== values.password){
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        // 阻止默认的点击事件执行
       try{
        await register(values);
       }catch(e){
            // onError(e);
            console.log(e);
       }
    } 
    return <Form onFinish={handleSubmit}>
        <Form.Item
            label='用户名'
            name='username'
            rules={[{required:true, message:'请输入用户名'}]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label='密码'
            name='password'
            rules={[{required:true, message:'请输入密码'}]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
            label='请确认密码'
            name='cpassword'
            rules={[{required:true, message:'请确认密码'}]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item>
            <LongButton  type={'primary'} htmlType='submit' >注册</LongButton>
        </Form.Item>   
    </Form>
}