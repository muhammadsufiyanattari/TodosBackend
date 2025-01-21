import mongoose from 'mongoose';
// dd.
const mongooseDbUri = process.env.MONGO_URI 


                 // connectDB boilerplate code
const connectDB = async () => {
    try {
        // Connect to the MongoDB server
        const connectionInstance = await mongoose.connect(mongooseDbUri, {
            dbName: "my-todo",    }
        );

        console.log(`\n🌿 MongoDB connected ! 🍃\n`);
 
        //agar connection fail ho to mongoose se error show karwaye ge
        mongoose.connection.on(
            "error",
            console.error.bind(console, "Connection error:"),
        );
// server ko close karne se phele ye function chalye ge connection close karne ke lye
        process.on("SIGINT", () => {
            // Cleanup code
            mongoose.connection.close();

            console.log("Mongoose connection closed due to application termination");
            process.exit(0);
        });
    } catch (error) {
        // agar connection fail ho to server ko close karne ke lye
        console.error("MONGODB connection FAILED ", error);
        process.exit(1); // Exited with error
    }
};

// (async () => {
    try {
        await connectDB();
    
        //       app.listen(PORT, () =>
        //         console.log(`⚙️  Server running at port ==>> ${PORT}`),
        //       );
    
        //       app.on("error", (err) => console.log("🚀 ~ main file:", err));
    } catch (err) {
        console.log("🚀 ~ main file ~ err:", err);
    }
    //   })(); self calling function