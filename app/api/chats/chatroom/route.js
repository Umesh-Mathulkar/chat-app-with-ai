// app/api/chatroom.ts
import { NextResponse } from "next/server";
import clientPromise from "../../components/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(); // your database name
    const chatroomsCollection = db.collection('chatrooms'); // replace with your chatrooms collection name

    const body = await req.json();

    let chatroom = await chatroomsCollection.findOne({ participants: { $all: body.participants } });

    if (!chatroom) {
        let result;
        try {
            result = await chatroomsCollection.insertOne({ participants: body.participants });
          } catch (error) {
            console.error("Error inserting chatroom:", error);
            // Handle error, e.g., return a response indicating the error
          }
          
          if (result) {
            chatroom = { _id: result.insertedId, participants: body.participants };
          } else {
            console.error("Unexpected result from insertOne:", result);
            // Handle unexpected result, e.g., return a response indicating the error
          }
    }

    return NextResponse.json( { chatroom }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while fetching or creating the chatroom.", error: error.message },
      { status: 500 }
    );
  }
}
