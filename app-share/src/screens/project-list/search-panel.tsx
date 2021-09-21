import React from 'react';
import {Input, Select, Form} from 'antd';

export interface  User {
    id: string,
    name: string,
    email: string,
    title: string,
    organization: string,
    token:string
}
const { Option } = Select;
interface SearchPanelProps {
    users: User[],
     param: {
        name: string;
        personId: string
    },
    // param:Partial<Pick<Project, 'name' | 'personId'>>;
    setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({users, param, setParam}:SearchPanelProps) => {
    return <Form style={{marginBottom:'2rem'}} layout={"inline"}>
        <Form.Item>
            {/* setParam(Object.assign({}, param, {name:evt.target.value})) */}
            <Input 
            placeholder='项目名'
            type='text' 
            value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
        </Form.Item>
        <Form.Item>
        <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option  value={''} >负责人</Select.Option>
                {
                    users.map((user) => <Option key={user.id} value={user.id}>{user.name}</Option>)
                }
            </Select>
        </Form.Item>
    </Form>
}