import { connectToDB } from "@utils/database";
import User from "@models/user";

export const POST = async ( req ) => {
    const { email, username, image } = await req.json();

    try{
        await connectToDB();

        const newUser = new User({
            email,
            username,
            image
        })

        await newUser.create();

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new User", { status: 500 });
    }
}