import mongoose from "mongoose";

export default {
    connectDatabase: async function() {
        try {
            await mongoose.connect(process.env.mongoConnectionString);
            console.log(`MongoDB connected successfully`);
        } catch(err) {
            console.error(`MongoDB Connection Error`);
        }
    }
}