"use client";

import LogInWithEmailComponent from "@components/LogInWithEmailComponent";
import {useState} from "react";
import {signIn} from "next-auth/react";

const LogIn = () => {
    const [user, setUser] = useState({ email: ""});
    const [submitting, setSubmitting] = useState(false);
    const loginUserWithEmail = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            await signIn("email");
            alert("Log in successfully!");
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <>
            <LogInWithEmailComponent
                user={user}
                setUser={setUser}
                submitting={submitting}
                loginUserWithEmail={loginUserWithEmail}
            />
        </>
    );
}

export default LogIn;