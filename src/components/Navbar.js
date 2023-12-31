"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
  

export default function Navbar() {
  const [state, setState] = React.useState(false)
  const data = useSession();
  const firstName = data.data.user.name[0].split();
  const lastName = data.data.user.name[1].split();

  const menus = [
    { title: "Home", path: "/" },
    { title: "Paper Publications", path: "/paperpublications" },
    { title: "Events", path: "/events" },
  ]

  return (
    <nav className="bg-white md:bg-transparent md:bg-gradient-to-b md:from-black/60 md:to-transparent w-full border-b md:border-0 h-[4.2rem]">
      <div className="items-center bg-white md:bg-transparent justify-between px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/" className="flex items-center">
            <img src={"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCluzF0Jb6hRWUW1jcRAvIvCwawoIQef8xjjcEy-WUYRb0EX_UWqzQcE1lFI2HJBzj3y5DNNUkvCODYoWQjQ1MQCtm8JlELaalroGXtC9R0INLGKlyU3NxsC_xVmREEo_bKINxmUcDeK8yBtZx2-ZL_cn8iiidWiYHxvKR25mJtiLGD88QM2mFm-iQUMvC/s1600/acrologo.png"} alt="Logo" className="h-[3.5rem] mr-1" />
            <h1 className="text-3xl font-bold text-blue-700 hover:text-blue-900">
                Acropolis
            </h1>
          </Link>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border mr-2"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <Avatar className="bg-gray-600 cursor-pointer">
                    <AvatarImage src="ng" />
                    <AvatarFallback className="uppercase">{firstName[0]}{lastName[0]}</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {signOut()}}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div
          className={`flex-1 w-fit pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-800 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            <div className="hidden md:block">
              <DropdownMenu>
                  <DropdownMenuTrigger>
                  <Avatar className="bg-gray-600 cursor-pointer">
                      <AvatarImage src="ng" />
                      <AvatarFallback className="uppercase">{firstName[0]}{lastName[0]}</AvatarFallback>
                  </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {signOut()}}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}