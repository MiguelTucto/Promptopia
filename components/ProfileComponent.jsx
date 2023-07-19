import PromptCard from "@components/PromptCard";
import NewUserForm from "@components/NewUserForm";
import Image from "@node_modules/next/image";
import Link from "next/link";

const ProfileComponent = ({ name, desc, handleDelete, handleEdit, handleUserUpdate, submitting, data, currentUser, setCurrentUser }) => {

    return (
        <>
            <section className="w-full">
                <div className="sm:flex-row flex justify-between items-center flex-col">
                    <div>
                        <h1 className="head_text text-left">
                            <span className="blue_gradient">
                                {name} Profile
                            </span>
                        </h1>
                        <p className="desc text-left">{desc} <i className="font-satoshi">{currentUser.username}</i></p>
                        <h2 className="mt-5 text-3xl font-bold blue_gradient">Personal Information</h2>
                        <p className="desc text-left">You can quickly edit your personal information</p>
                        <NewUserForm
                            user={currentUser}
                            setUser={setCurrentUser}
                            handleSubmit={handleUserUpdate}
                            submitting={submitting}
                            type="Update"
                        />
                    </div>
                    <div className="">
                        <Image src={currentUser.image} width={200} height={80} className="rounded-full  " alt="ProfileComponent"/>
                    </div>
                </div>
                <h2 className="mt-5 text-3xl font-bold blue_gradient">Your Prompts</h2>
                <div className="prompt_layout">
                    {
                        data.length === 0 ? (
                            <>
                                <h1>Empty prompts :(  <Link href="/create-prompt" className="blue_gradient font-extrabold">You can click here to add one</Link></h1>

                            </>
                        ) : (
                            data.map((post) => (
                                <PromptCard
                                    key={post._id}
                                    post={post}
                                    handleEdit={() => handleEdit && handleEdit(post)}
                                    handleDelete={() => handleDelete && handleDelete(post)}
                                />
                            ))
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default ProfileComponent;