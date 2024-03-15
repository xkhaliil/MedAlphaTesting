import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SignInForm } from "@/components/forms/sign-in-form";

export default function Home() {
  return (
    <div>
      <SignInForm />
      <Button>
        <Link href="/form">click here</Link>
      </Button>
    </div>
  );
}
