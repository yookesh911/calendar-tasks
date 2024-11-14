import { gapi } from 'gapi-script';

const formattedDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }) : '';
};

const completeTask = async (taskId, taskListId, fetchCallBack) => {
    try {
        if (taskListId && taskId) {
            const response = await gapi.client.tasks.tasks.patch({
                tasklist: taskListId,
                task: taskId,
                resource: {
                    status: "completed",
                },
            });
            if (typeof fetchCallBack === 'function') fetchCallBack();
            console.log("Task marked as completed:", response.result);
            return response
        }
    } catch (error) {
        console.error("Error completing task:", error);
    }
}

export {
    formattedDate,
    completeTask
}