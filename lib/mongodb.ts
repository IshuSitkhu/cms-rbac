// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI;

// // if (!MONGODB_URI) {
// //   throw new Error(
// //     "Please define the MONGODB_URI environment variable in .env.local"
// //   );
// // }

// // interface MongooseCache {
// //   conn: typeof mongoose | null;
// //   promise: Promise<typeof mongoose> | null;
// // }

// // declare global {
// //   // eslint-disable-next-line no-var
// //   var mongoose: MongooseCache;
// // }

// // const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// // async function connectToMongoDB() {
// //   if (cached.conn) {
// //     return cached.conn;
// //   }

// //   if (!cached.promise) {
// //     cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => {
// //       console.log("MongoDB connected");
// //       return mongoose;
// //     });
// //   }

// //   cached.conn = await cached.promise;
// //   global.mongoose = cached; // ensure global is updated
// //   return cached.conn;
// // }

// // export default connectToMongoDB;


// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable in .env");
// }

// let cached = (global as any).mongoose;

// if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

// async function dbConnect() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     // At this point TS knows MONGODB_URI is a string
//     cached.promise = mongoose.connect(MONGODB_URI as string).then(m => m);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;


// lib/mongodb.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Use a cached connection to avoid multiple connections in development
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

const cached = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((mongooseInstance) => {
        console.log("MongoDB connected!");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
