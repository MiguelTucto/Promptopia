"use client";

import {useSearchParams} from "@node_modules/next/dist/client/components/navigation";
import {useEffect, useState} from "react";
import Feed from "@components/Feed";
import Form from "@components/Form";

const UpdatePrompt = () => {
    const searchParams = useSearchParams();
    const getPromptId = searchParams.get("id");

    const [post, setPost] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchDataForPost = async () => {
            const response = await fetch(`api/prompt/${getPromptId}`)
            const data = await response.json();

            setPost(data);
        };

        if (getPromptId) fetchDataForPost();
    }, [getPromptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!getPromptId) return alert("Missing PromptId.");

        try {
            const response = await fetch(`api/prompt/${getPromptId}`,{
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                alert("¡Prompt updated successfully!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </>
    )
}

export default UpdatePrompt;