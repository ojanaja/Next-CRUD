import Task from "@/models/Task";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newTask = new Task(body);
    const savedTask = await newTask.save();
    return NextResponse.json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
