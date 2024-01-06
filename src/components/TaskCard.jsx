import Link from "next/link";

export function TaskCard({ task }) {
    return (
        <Link href={`/tasks/${task._id}`}>
            <div className="bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <p className="text-slate-300">{task.description}</p>
                <p className="text-slate-300 my-2">
                    <span className="mr-1">Priority:</span>
                    {task.priority}
                </p>
                <p className="text-slate-300">
                    <span className="mr-1">Status:</span>
                    {task.status}
                </p>
                <p className="text-slate-300">
                    <span className="mr-1">Due Date:</span>
                    {task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "Not specified"}
                </p>

                <p className="text-slate-300">
                    <span className="mr-1">Assigned To:</span>
                    {task.assignedTo || "Not specified"}
                </p>
                <p className="text-slate-300">
                    <span className="mr-1">Tags:</span>
                    {Array.isArray(task.tags) ? task.tags.join(", ") : "No tags"}
                </p>
                <p className="text-slate-400 my-2">
                    <span className="mr-1">Created at:</span>
                    {new Date(task.createdAt).toLocaleDateString()}
                </p>
            </div>
        </Link>
    );
}

export default TaskCard;
