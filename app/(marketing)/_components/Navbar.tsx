'use client'

import { useConvexAuth } from "convex/react"
import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"
import { Logo } from "./Logo"
import { ModeToggle } from "@/components/mode-toggle"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Spinner } from "@/components/spinner"

	

export function Navbar () {

  const {isAuthenticated,isLoading} = useConvexAuth()
  const scrolled = useScrollTop()

return (
    <div className={cn(`z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6`,scrolled && 'border-b shadow-sm')}>
      <Logo/>
      <div className="md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full">
      {isLoading && (
         <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant='ghost' size='sm'>
                Giriş
              </Button>
            </SignInButton>
              <SignInButton mode="modal">
              <Button  size='sm'>
                Ücretsiz Botions Ol
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/documents'>
                Giriş
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/"/>
          </>
        )}
        <ModeToggle/>
      </div>
    </div>
)
}