import { NextResponse } from "next/server";
import clientPromise from "../../components/lib/mongodb";


export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(); // your database name
    const usersCollection = db.collection('users'); // NextAuth creates a 'users' collection

    const users = await usersCollection.find({}).toArray();

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users, {
      status: 200, 
      headers: {
        'Cache-Control': 'no-cache' 
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while fetching the users.", error: error.message },
      { status: 500 }
    );
  }
}
