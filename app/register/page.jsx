"use client";

import Form from "@components/Form";
import NewUserForm from "@components/NewUserForm";
import {useState} from "react";
import { useRouter} from "next/navigation";

const Register = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        username: '',
        image: ''
    })
    const [submitting, setSubmitting] = useState(false);

    const createUser = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('api/user/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: user.email,
                        username: user.username,
                        image: user.image
                    })
                })
            console.log(response);
            if (response.ok) {
                alert("User created!");
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(true);
        }

    }
    return (
        <>
            <NewUserForm
                user={user}
                setUser={setUser}
                submitting={submitting}
                handleSubmit={createUser}
                type="Create"
            />
        </>
    )
}

export default Register;