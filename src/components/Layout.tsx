import { ReactNode } from "react";

import Head from "next/head";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { CaretDownIcon, HomeIcon } from "@radix-ui/react-icons";
import ModeToggle from "./ModeToggle";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-background w-screen h-screen p-2">
        <div className="border w-full h-full rounded-lg">
          <div className="flex justify-between border-b p-2">
            <Link href="/" className={buttonVariants({ variant: "ghost" })}>
              <HomeIcon />
            </Link>
            <div className="space-x-2">
              <ModeToggle/>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="w-32 h-10" variant="ghost">
                    Dashboard
                    <CaretDownIcon className="ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px]">
                  <a href="/" className="flex flex-row">
                    <Avatar className="mr-4 h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <p className="text-md overflow-ellipsis overflow-hidden block whitespace-nowrap h-8">
                      Server Name
                    </p>
                  </a>
                </PopoverContent>
              </Popover>
              <Button variant="ghost">Log Out</Button>
            </div>
          </div>
          {children}
        </div>
      </main>
    </>
  );
}