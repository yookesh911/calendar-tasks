import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, subtaskUpdateData, subTaskList, setSubTaskList, setTaskListData }) => {
    const [taskList, setTaskList] = useState([]);
    // const [initialFlag, setInitialFlag] = useState(false);

    useEffect(() => {
        fetchTasks();
        // setInitialFlag(true)
    }, [tasks]);

    useEffect(()=>{
        // if(!initialFlag){
            if(tasks.id == subtaskUpdateData?.parentId ){
                fetchTasks();
            }
        // }
    }, [subtaskUpdateData])
    
    const fetchTasks = async () => {
        try {
            // setSubTaskList(null)
            const response = await gapi.client.tasks.tasks.list({
                tasklist: tasks.id
            });
            const data = buildTaskTree(response.result.items);
            setTaskList(data);

            if(subTaskList?.length){
                const subTaskListIds = subTaskList?.map(task => task.id)
                const subtasks = data?.filter(task => subTaskListIds?.includes(task.id));
                if(subtasks?.length){
                    setSubTaskList(subtasks)
                }
            }

            console.log('Tasks:', response.result.tasks);
        } catch (error) {
            console.error('Error retrieving tasks:', error);
        }
    }

    const buildTaskTree = (taskData) => {
        try {
                const taskMap = {};  
            // taskData.forEach((task,index) => {
            //     task.reactUniqueKey =  new Date().getTime() + index;
            // })
        
            taskData.forEach(task => {
                taskMap[task.id] = { ...task, subtasks: [] };
            });
        
            const rootTasks = [];
        
            taskData.forEach(task => {
                if (task.parent) {
                    taskMap[task.parent]?.subtasks?.push(taskMap[task.id]);
                } else {
                    rootTasks.push(taskMap[task.id]);
                }
            });
            return rootTasks;
    
        } catch (error) {
            console.log('sdfsdf',error)
        }
        
    }

    return (
        <div className="task-container">
            <span className='tasks-title'>{tasks?.title} <span className="count">({taskList?.length})</span></span>
            <div className="task-list">
                {taskList?.map(task => (
                    <TaskCard key={task.id} task={task} taskListId={tasks.id} fetchCallBack={fetchTasks}
                        onCardClick={(value) => { setSubTaskList(value); setTaskListData(tasks); }}/>
                ))}
            </div>
        </div>
    )
}

export default TaskList;