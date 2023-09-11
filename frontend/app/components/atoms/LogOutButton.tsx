import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export const LogOutButton = () => {
  return (
    <Button
      className="text-sm font-bold bg-purple-500 text-white hover:bg-purple-400"
      onClick={() => signOut()}
    >
      Log Out
    </Button>
  );
};
