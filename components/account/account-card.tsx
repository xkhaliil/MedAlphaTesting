import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountCard(_props: any) {
  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <Avatar className="h-50 m-9 w-10 p-6">
              <AvatarImage
                src={_props.image}
                alt="IMG"
                className="rounded-full"
              />
              <AvatarFallback>{_props.pr}</AvatarFallback>
            </Avatar>
          </CardTitle>
          <CardDescription>Account Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Name : {_props.name}</p>
        </CardContent>
        <CardFooter>
          <p>Email : {_props.email}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
