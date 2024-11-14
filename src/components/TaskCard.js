import React, { useState } from 'react';
import { completeTask, formattedDate } from './commonFunction';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConfirmationPopup from './confirmation-dialog';

const TaskCard = ({ task, onCardClick, taskListId, fetchCallBack }) => {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        setOpen(false);
        completeTask(task?.id, taskListId, fetchCallBack);
    };

    return (
        <>
            <div key={task} className="task-card" onClick={() => onCardClick(task?.subtasks?.length ? task.subtasks : [])}>
                <div className="taskcard-header">
                    <span className="task-title"><span className="heading">{task?.title}</span> <span className="count">({task?.subtasks?.length})</span></span>
                    {task?.status === 'needsAction' ?
                        <CheckCircleOutlineIcon className={task?.status} onClick={(e) => {
                            e.preventDefault();
                            e?.stopPropagation();
                            setOpen(true);
                        }
                        } /> :
                        <CheckCircleIcon className={task?.status} />
                    }
                </div>
                <div className="task-details">{task?.notes}</div>
                <div className="task-action">
                    <span className={`status ${task?.status}`}>{task?.status === 'needsAction' ? 'Pending' : 'Completed'}</span>
                    {task?.due && <div className="task-date"><b>Due: </b>{formattedDate(task?.due)}</div>}
                </div>
            </div>

            <ConfirmationPopup
                open={open}
                handleClose={() => setOpen(false)}
                handleConfirm={handleConfirm}
                taskName={task?.title}
            />
        </>
    );
}

export default TaskCard;