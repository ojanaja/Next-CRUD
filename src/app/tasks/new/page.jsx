"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const NewTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
    assignedTo: "",
    tags: [],
  });

  const params = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`);
      if (!res.ok) {
        console.error("Failed to fetch task:", res.statusText);
        return;
      }
      const data = await res.json();
      setNewTask(data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          await getTask();
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchData();
  }, [params.id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (params.id) {
      await updateTask();
    } else {
      await createTask();
    }

    router.push("/");
  };

  const handleChange = (e) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };


  const validate = () => {
    let errors = {};

    if (!newTask.title) {
      errors.title = "Title is required";
    }
    if (!newTask.description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  const createTask = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        console.error("Failed to create task:", response.statusText);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the task "${newTask.title}"?`)) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">
            {!params.id ? "Create Task" : "Update task"}
          </h1>
          {params.id && (
            <button
              className="bg-red-500 px-3 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </header>
        <input
          type="text"
          placeholder="Task title"
          name="title"
          onChange={handleChange}
          value={newTask.title}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <textarea
          name="description"
          placeholder="Task description"
          onChange={handleChange}
          value={newTask.description}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          rows={3}
        ></textarea>

        <label className="block text-gray-300 text-sm font-semibold my-2">
          Priority:
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
            className="bg-gray-800 border-2 w-full p-2 rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="block text-gray-300 text-sm font-semibold my-2">
          Status:
          <select
            name="status"
            value={newTask.status}
            onChange={handleChange}
            className="bg-gray-800 border-2 w-full p-2 rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label className="block text-gray-300 text-sm font-semibold my-2">
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate.slice(0, 10)}
            onChange={handleChange}
            className="bg-gray-800 border-2 w-full p-2 rounded-lg"
          />
        </label>

        <label className="block text-gray-300 text-sm font-semibold my-2">
          Assigned To:
          <input
            type="text"
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleChange}
            className="bg-gray-800 border-2 w-full p-2 rounded-lg"
          />
        </label>

        <label className="block text-gray-300 text-sm font-semibold my-2">
          Tags
          <input
            type="text"
            name="tags"
            value={newTask.tags ? newTask.tags.join(", ") : ""}
            onChange={(e) => setNewTask({ ...newTask, tags: e.target.value.split(", ") })}
            className="bg-gray-800 border-2 w-full p-2 rounded-lg"
          />
        </label>

        <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
          {params.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
