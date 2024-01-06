import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "The Task title is required "],
            unique: true,
            trim: true,
            maxlength: [40, "Title cannot be greater than 40 characters"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: [200, "Description cannot be greater than 200 characters"],
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"]
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"]
        },
        dueDate: {
            type: Date,
        },
        assignedTo: {
            type: String,
        },
        tags: {
            type: [String],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.Task || model("Task", TaskSchema);
