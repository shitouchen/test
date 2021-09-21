import React from 'react';
import { User } from './search-panel';
import {Dropdown, Table, TableProps, Button,} from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {Pin} from '../../components/pin';
import { useEditPropject } from '../../utils/project';
import Menu from 'rc-menu/lib/Menu';

export interface Project {
    id: string,
    name:string,
    personId: string,
    pin:boolean;
    organization: string
    created: number,
}
interface ListProps extends TableProps<Project> {
    users: User[];
    refersh?:() => void;   
    setProjectOpen: (isOpen:boolean)=>void; 
}
// type PropsType = Omit<ListProps, 'users'>
export const List = ({users, ...props}: ListProps) => {
    const {mutate} = useEditPropject()
    // const pinProject = (id: string, pin: boolean) => mutate({id, pin}) 柯里化
    const pinProject = (id: string) => (pin: boolean) => mutate({id, pin}).then(props.refersh) // 先消化id，再消化pin
    return   <Table pagination={false} columns={
        [
            {
                title: <Pin
                    checked={true}
                    disabled={true}
                />,
                render(value, project){
                    return <Pin checked={project.pin} onCheckedChange={
                        // project.id在传入时就知道，pin是在函数调用时才知道
                        // pin => pinProject(project.id, pin)
                        pinProject(project.id)
                    }/>
                }   
            },
            {
            key: 'name',
            title:'名称',
            dataIndex:'name',
            sorter:(a,b) => a.name.localeCompare(b.name),
            render (value, project) {
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },
        {
            key:'organization',
            title:'部门',
            dataIndex:'organization',
        },
        {
            key:'user.name',
            title:'负责人',
            render(value, project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name || '未知' }
                </span>
            }
        },
        {
            key:'project.created',
            title: '创建时间',
            render(value, project){
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : ''}
                </span>
            }
        },
        {
            render(value, project){
                return <Dropdown overlay={<Menu>
                        <Button type={'link'} onClick={()=> props.setProjectOpen(true)}>编辑</Button>
                </Menu>}>
                    <Button type={'link'}>...</Button>
                </Dropdown>
            }
        }
    ]
    } 
    {...props}
    />
}