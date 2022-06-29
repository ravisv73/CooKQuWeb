import mongoose from "mongoose";

const connection = {};

async function connect() {
    console.log('making attempts to connect');
    console.log("MONGO_DB_URI:"+process.env.MONGODB_URI);
    console.log('Connection: '+ connection.isConnected);
    if (connection.isConnected) {
        console.log('already connected');
        return;
    }
    if(mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected === 1){
            console.log('use previous connection');
            return;
        }
        await mongoose.disconnect();
    }
    
    const db = await mongoose.connect(process.env.MONGODB_URI, {
    //const db = await mongoose.connect("mongodb://localhost:27017/local", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('New connection');
    connection.isConnected = db.connections[0].readyState;
    console.log('Connection: '+ connection.isConnected);
}

async function disconnect() {
    console.log('in Disconnect method, Connection: '+ connection.isConnected);
    if(connection.isConnected) {
        console.log("NODE_ENV:"+process.env.NODE_ENV);
        console.log('Connection exists. Now disconnect');
        if(process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
            console.log('Disconnected');
        } else {
            console.log('not disconnected');
        }
    }
}

const db = {connect, disconnect};

export default db;