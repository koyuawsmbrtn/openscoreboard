import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

export const Logo = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => (
  <Link {...props} className={className}>
    <div className="flex items-center gap-2 font-medium">
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <Gamepad2 className="size-4" />
      </div>
      <span className="group-data-[collapsible=icon]:hidden">OpenScoreboard</span>
    </div>
  </Link>
);
