"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter} from "next/navigation";

import Form from '@components/Form';
import {session} from "@node_modules/next-auth/core/routes";
import {router} from "@node_modules/next/dist/client";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost]= useState({
        prompt: '',
        tag: ''
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('api/prompt/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag
                    })
                })
            console.log(response);
            if(response.ok) {
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            {
                session?.user ? (
                    <Form
                        type="Create"
                        post={post}
                        setPost={setPost}
                        submitting={submitting}
                        handleSubmit={createPrompt}
                    />
                ) : (
                    router.push('/')
                )
            }

        </>
    )
}

export default CreatePrompt;