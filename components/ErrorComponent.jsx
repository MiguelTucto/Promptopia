import Link from "next/link";
import Image from "next/image";
import PageNotFoundImage from "public/assets/images/pagenotfound.jpg";
const ErrorComponent = () => {
    return (
        <>
            <div className="flex flex-col flex-end  gap-5 ">
                <h1 className="head_text text-left">
                    <span className="blue_gradient">
                        Page Not Found
                    </span>
                </h1>
                <Link
                    href="/"
                    className="hover:bg-amber-50 hover:text-gray-900  px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                >
                    Back to Home
                </Link>
            </div>

        </>
    )
}

export default ErrorComponent;