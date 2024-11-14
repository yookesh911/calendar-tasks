import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { completeTask, formattedDate } from './commonFunction';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConfirmationPopup from './confirmation-dialog';

const SubTaskList = ({ tasks, setSubtaskUpdateData, taskListId, setSubTaskList }) => {
    const updateSetSubtaskUpdateData = (task) => {
        setSubtaskUpdateData({ parentId: task.parent, time: new Date().getTime() })
    }


    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
  
    const handleCompleteClick = (task) => {
      setSelectedTask(task);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedTask(null);
    };
  
    const handleConfirm = () => {
      // Add logic to mark task as complete
      handleSubmit();
      handleClose();
    };


    // const handleSubmit = async (task) => {
    const handleSubmit = async () => {
        const response = await completeTask(selectedTask?.id, taskListId, () => updateSetSubtaskUpdateData(selectedTask));
        if (response && response.result) {
            setSubTaskList(prevTasks => prevTasks.map(t =>
                t.id === selectedTask.id ? { ...t, status: "completed" } : t
            ));
        }
    }

    return (
        <Box sx={{ width: 500, height: 'calc(100% - 3em)', padding: '0 15px' }}>
            <h3>Subtask List</h3>
            {Array.isArray(tasks) && tasks?.length
                ? (
                    <div className="subtasks-container">
                        {tasks.map((task) => (
                            <div key={task.id} className="subtask-content">
                                <div className="subtask">
                                    <div className="subtask-header">
                                        <span className="task-title">{task.title}</span>
                                        {task?.due && <div className="task-date"><b>Due: </b>{formattedDate(task?.due)}</div>}
                                    </div>
                                    <div className="task-details">{task?.notes}</div>
                                    <span className={`subtask-status ${task?.status}`}></span>
                                </div>
                                {task?.status !== 'needsAction' ?
                                    <CheckCircleIcon className={`subtask-icon ${task?.status}`} /> :
                                    // <CheckCircleOutlineIcon onClick={() => completeTask(task.id, taskListId, fetchTasksList)} className={`subtask-icon ${task?.status}`} />
                                    <CheckCircleOutlineIcon onClick={() => handleCompleteClick(task)} className={`subtask-icon ${task?.status}`} />
                                }
                            </div>
                        ))}
                    </div>
                )
                : (
                    <div className="no-data">No subtasks exists.</div>
                )}

            <ConfirmationPopup
                open={open}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                taskName={selectedTask?.title}
            />
        </Box>
    )
}

export default SubTaskList;