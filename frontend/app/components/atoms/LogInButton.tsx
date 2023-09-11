import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export const LogInButton = () => {
  return (
    <Button
      className="text-sm font-bold bg-pink-500 text-white hover:bg-pink-400"
      onClick={() => signIn("google")}
    >
      Log In
    </Button>
  );
};
