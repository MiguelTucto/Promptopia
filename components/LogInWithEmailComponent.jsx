const LogInWithEmailComponent = ({ user, setUser, submitting, loginUserWithEmail }) => {
    return (
        <>
            <section className="w-full max-w-full flex-start flex-col">
                <form
                    onSubmit={loginUserWithEmail}
                    className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
                >
                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Complete the field with your email to LogIn
                            <span>(#product, #webdevelopment, #idea)</span>
                        </span>
                        <input
                            value={user.email}
                            onChange={(e) => setUser({...user, user: e.target.value })}
                            placeholder="Email"
                            required
                            className="form_input"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        Log In
                    </button>
                </form>

            </section>
        </>
    )
}

export default LogInWithEmailComponent;