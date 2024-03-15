import React from "react";

import Image from "next/image";
import Link from "next/link";
import logoipsum from "@/public/logoipsum-330.svg";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar(_props: any) {
  return (
    <div>
      <nav className="bg-white p-5 shadow md:flex md:items-center md:justify-between">
        <div className="inline">
          <Image src={logoipsum} alt="logo" />
        </div>
        <ul className="flex items-center">
          <li className="mr-4 inline">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>{_props.pr}</AvatarFallback>
            </Avatar>
          </li>
          <li className="inline">
            <a href="#">Sign Out</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
