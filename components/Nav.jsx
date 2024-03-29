"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import {providers} from "@node_modules/next-auth/core/routes";
import {useRouter} from "@node_modules/next/dist/client/components/navigation";
const Nav = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
            console.log("Providers", res);

            Object.values(res).map((provider) => {
                console.log(provider.id, provider.name);
            })

        })();
    }, [])

    const logOut = () => {
        router.push("/");
        signOut();

    }

  return (
      <>
          <nav className="flex-between w-full mb-16 pt-3">
              <Link href="/" className="flex gap-2 flex-center">
                  <Image
                      src="/assets/images/logo.svg"
                      alt="Promptopia Logo"
                      width={30}
                      height={30}
                      className="object-contain"
                  />
                  <p className="logo_text">Promptopia</p>
              </Link>

              <div className="sm:flex hidden">
                  {
                      session?.user ? (
                          <div className="flex gap-3 md:gap-5">
                              <Link href="/create-prompt" className="black_btn">
                                  Create Post
                              </Link>
                              <button  type="button" onClick={logOut} className="outline_btn">
                                  Sign Out
                              </button>
                              <Link href="/profile">
                                  <Image src={session.user.image} width={37} height={37} className="rounded-full" alt="ProfileComponent"/>
                              </Link>
                          </div>
                      ): (
                          <>
                              {providers &&
                              Object.values(providers).map((provider) => (
                                  <div key={provider.id} className="flex gap-3">
                                      <button
                                          type="button"
                                          key={provider.name}
                                          onClick={() => signIn(provider.id)}
                                          className="black_btn"
                                      >
                                          Sign In
                                      </button>
                                      {
                                          /*
                                            <Link href="/log-in" className="outline_btn">
                                                 Log In with Email
                                            </Link>
                                          */
                                      }

                                      <Link href="/register" className="outline_btn">
                                          Register Now!
                                      </Link>
                                  </div>
                              ))}
                          </>
                      )
                  }
              </div>
              { /*Mobile Navigation */}
              <div className="sm:hidden flex relative">
                  {
                      session?.user ? (
                          <div className="flex">
                              <Image src={session?.user.image} alt="ProfileComponent" width={37} height={37} className="rounded-full" onClick={() => setToggleDropdown((prev) => !prev)} />
                              {
                                  toggleDropdown && (
                                      <div className="dropdown">
                                          <Link
                                              href="/profile"
                                              className="dropdown_link"
                                              onClick={() => setToggleDropdown(false)}
                                          >
                                              My Profile
                                          </Link>
                                          <Link
                                              href="/create-prompt"
                                              className="dropdown_link"
                                              onClick={() => setToggleDropdown(false)}
                                          >
                                              Create Prompt
                                          </Link>
                                          <button
                                              type="button"
                                              onClick={() => {
                                                  setToggleDropdown(false);
                                                  signOut();
                                              }}
                                              className="mt-5 w-full black_btn"
                                          >
                                              Sign Out
                                          </button>
                                      </div>
                                  )
                              }
                          </div>
                      ) : (
                          <>
                              {providers &&
                                  Object.values(providers).map((provider) => (
                                      <button
                                          type="button"
                                          key={provider.name}
                                          onClick={() => signIn(provider.id)}
                                          className="black_btn"
                                      >
                                          Sign In
                                      </button>
                                  ))}
                          </>
                      )
                  }
              </div>

          </nav>
      </>
  )
}

export default Nav;