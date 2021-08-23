// import { setMaxListeners } from 'process';
// import { stringify } from 'qs';

import React from 'react';
import { useAuth } from '../../context/auth-context';
import {  Form, Input } from 'antd';

import { LongButton } from '.';

export const RegisterScreen = () => {
    const {register} = useAuth()
    const handleSubmit = (values: {username:string, password:string}) => {
        // 阻止默认的点击事件执行
       
        register(values)
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
        <Form.Item>
            <LongButton  type={'primary'} htmlType='submit' >注册</LongButton>
        </Form.Item>   
    </Form>
}