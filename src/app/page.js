"use client"
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Home() {
  const {status} = useSession();
  console.log(status);
  return (
    <>
      <Button>Home</Button>
    </>
  );
}