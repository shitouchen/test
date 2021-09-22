import { Typography,List, Popover, Divider,Button } from 'antd';
import React from 'react';
import { useProjects } from '../utils/project';


export const ProjectPopover = (props:{
    // setProjectOpen: (isOpen:boolean)=>void
    projectButton:JSX.Element
}) => {
    // const {setProjectOpen} = props;
    // const {projectButton} = props;
    const {data: projects, isLoading} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)

    const content = <div>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider/>
        {/* <Button style={{padding:'0'}} type={'link'} onClick={() => setProjectOpen(true)}>创建项目</Button> */}
        {props.projectButton}
    </div>
    return <Popover placement={'bottom'} content={content}>
    <span>项目</span>
</Popover>
}