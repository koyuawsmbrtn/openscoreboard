import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import { Logo } from "../../components/logo"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo className="h-8 w-auto" href="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/background.jpg"
          width={500}
          height={500}
          alt="Background image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
