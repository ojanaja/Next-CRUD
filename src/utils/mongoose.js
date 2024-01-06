import { connect, connection } from "mongoose";

const conn = {
    isConnected: false,
};

export async function dbConnect() {
    if (conn.isConnected) {
        return;
    }

    const db = await connect(
        "mongodb+srv://collagejvnx:YYYRYPsYhIGzMjGz@starter.1yek3ut.mongodb.net/?retryWrites=true&w=majority"
    );
    // console.log(db.connection.db.databaseName);
    conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Mongodb connected to db"));

connection.on("error", (err) => console.error("Mongodb Errro:", err.message));
