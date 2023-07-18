import PromptCard from "@components/PromptCard";
import NewUserForm from "@components/NewUserForm";

const ProfileComponent = ({ name, desc, handleDelete, handleEdit, handleUserUpdate, submitting, data, currentUser, setCurrentUser}) => {
    return (
        <>
            <section className="w-full">
                <h1 className="head_text text-left">
                    <span className="blue_gradient">
                        {name} Profile
                    </span>
                </h1>
                <p className="desc text-left">{desc} <i className="font-satoshi">{currentUser.username}</i></p>

                <h2 className="mt-5 text-3xl font-bold blue_gradient">Personal Information</h2>
                <NewUserForm
                    user={currentUser}
                    setUser={setCurrentUser}
                    handleSubmit={handleUserUpdate}
                    submitting={submitting}
                />
                <h2 className="text-3xl font-bold blue_gradient">Your Prompts</h2>
                <div className=" prompt_layout">
                    {
                        data.map((post) => (
                            <PromptCard
                                key={post._id}
                                post={post}
                                handleEdit={() => handleEdit && handleEdit(post)}
                                handleDelete={() => handleDelete && handleDelete(post)}
                            />
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default ProfileComponent;