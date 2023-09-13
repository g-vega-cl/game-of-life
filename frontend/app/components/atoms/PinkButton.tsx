import React from 'react';
import { Button, ButtonProps } from "@chakra-ui/react";
import classNames from "classnames";

export const PinkButton: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <Button
      {...props}
      className={classNames("text-sm font-bold bg-pink-500 text-white hover:bg-pink-400", className)}
    >
      {children}
    </Button>
  );
};
