import React, { useEffect, useState } from 'react';
import './styles.css';
import { gapi } from 'gapi-script';
import { Drawer } from '@mui/material';
import TaskList from './TaskList';
import SubTaskList from './SubTaskList';

const TasksList = ({ setIsAuthenticated }) => {

    const [subTaskList, setSubTaskList] = useState([]);
    const [taskListData, setTaskListData] = useState([]);
    const [tasksList, setTasksList] = useState([]);
    const [subtaskUpdateData, setSubtaskUpdateData] = useState({ parentId: null, time: new Date().getSeconds() })

    const fetchTasksList = async () => {
        try {
            const response = await gapi.client.tasks.tasklists.list();
            console.log('TASKS LIST', response.result.items);
            setTasksList(response.result.items || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    useEffect(() => {
        fetchTasksList();
    }, []);

    async function logOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User logged out');
            setIsAuthenticated(false);
        });
    }

    return (
        <>
            <h2>Tasks List</h2>
            <button className="logout-btn" onClick={() => logOut()}>Logout</button>
            <div className="app-container">
                {tasksList.map((tasks) => (
                    <TaskList subtaskUpdateData={subtaskUpdateData} subTaskList={subTaskList} key={tasks?.id} tasks={tasks} setSubTaskList={setSubTaskList} setTaskListData={setTaskListData} />
                ))}
            </div>
            <React.Fragment>
                <Drawer
                    anchor={'right'}
                    open={!!subTaskList?.length}
                    onClose={() => { setSubTaskList(null); setTaskListData(null); }}
                >
                    <SubTaskList tasks={subTaskList} setSubTaskList={setSubTaskList} taskListId={taskListData?.id} setSubtaskUpdateData={setSubtaskUpdateData} />
                </Drawer>
            </React.Fragment>
        </>
    );
};

export default TasksList;
