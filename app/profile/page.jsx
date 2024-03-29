"use client";
import ProfileComponent from "@components/ProfileComponent";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import { useRouter} from "next/navigation";
import ErrorComponent from "@components/ErrorComponent";
const Profile = () => {
    const router = useRouter();

    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchPosts =  async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        const fetchUser = async () => {
            const response = await fetch(`/api/user/${session?.user.id}`);
            const data = await response.json();
            setUser(data);
        }
        if (session?.user.id) {
            fetchUser();
            fetchPosts();
        }
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const confirmation = confirm(
            "¿Are you sure you want to delete this prompt?"
        );

        if (confirmation) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE"
                });

                const filteredPosts = posts.filter((item) => item.id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!session?.user.id) return alert("Missing UserID");

        try {
            const response = await fetch(`/api/user/${user._id}`,{
                method: "PATCH",
                body: JSON.stringify({
                    email: user.email,
                    username: user.username,
                    image: user.image
                }),
            });

            if (response.ok) {
                alert("Update Works!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }

    }

    return(
        <>
            {
                session?.user ? (
                    <ProfileComponent
                        name="My"
                        desc="Welcome to your personalized profile page"
                        data={posts}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleUserUpdate={handleUserUpdate}
                        submitting={submitting}
                        currentUser={user}
                        setCurrentUser={setUser}
                    />
                ) : (
                    <ErrorComponent />
                )

            }

        </>
    )
}
export default Profile;