import React from "react";

import { auth } from "@/auth";

import { Card } from "@/components/ui/card";
import { AccountCard } from "@/components/account/account-card";
import { Navbar } from "@/components/navbars/navbar";

export default async function Dashboard() {
  const currentUser = await auth();
  const name = currentUser?.user?.name;
  const email = currentUser?.user?.email;
  const image = currentUser?.user?.image;

  return (
    <div className="h-screen bg-slate-400 ">
      <Navbar pr={name?.charAt(0)} />
      {JSON.stringify(currentUser)}
      <AccountCard
        name={name}
        email={email}
        image={image}
        pr={name?.charAt(0)}
      />
    </div>
  );
}
