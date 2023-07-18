import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);
        console.log('user fetch works!');
        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch an specific User", { status: 500 })
    }
}

export const PATCH = async (req, { params })=> {
    const { username, email, image } = await req.json();
    console.log('user patch works!');
    try {
        await connectToDB();
        console.log(params.id);
        const existingUser = await User.findById(params.id);

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }
        console.log("testing1");
        existingUser.username = username;
        existingUser.email = email;
        existingUser.image = image;
        console.log("testing2");
        console.log(existingUser);
        await existingUser.save();
        console.log("testing3");
        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Updating User", { status: 500 });
    }
}