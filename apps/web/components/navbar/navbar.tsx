"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "../logo";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const session = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const navbarYTransform = useTransform(
    scrollY,
    [0, 50, 100],
    [0, 0, -100],
    {
      clamp: true,
    }
  );

  const NavItems = () => (
    <>
      {session.data?.user ? (
        <>
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto rounded-full cursor-pointer mb-2 sm:mb-0 sm:mr-3">
              Dashboard
            </Button>
          </Link>
          <Button 
            className="w-full sm:w-auto rounded-full cursor-pointer" 
            variant="outline" 
            onClick={() => {
              authClient.signOut();
              setIsOpen(false);
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href="/login" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <motion.nav 
      initial={{ y: 0 }}
      style={{ y: navbarYTransform }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 sm:top-6 inset-x-0 sm:inset-x-4 h-16 bg-white dark:bg-muted dark:brightness-[125%] border max-w-screen-xl mx-auto sm:rounded-full z-50"
    >
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Logo className="shrink-0" href="/" />
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="top" 
              className="flex flex-col items-center justify-center w-full h-[100vh]"
            >
              <NavItems />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-2">
          <NavItems />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;