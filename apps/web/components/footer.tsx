import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Logo } from "./logo";
import Bluesky from "./icons/bluesky";
import Github from "./icons/github";

const footerLinks = [
  {
    title: "Overview",
    href: "/overview",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
];

const Footer = () => {
  return (
    <footer className="mt-auto from-background to-muted">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          {/* Logo and Links Section */}
          <div className="flex flex-col items-center space-y-8">
            <Logo className="h-8 w-auto" href="/" />
            
            <nav>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Separator className="my-8 md:my-12" />

          {/* Bottom Section */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link 
                href="/" 
                className="hover:text-foreground transition-colors duration-200"
              >
                OpenScoreboard
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-6">
              <Link 
                href="https://bsky.app/profile/osb.koyu.space" 
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Bluesky size={20} />
                <span className="sr-only">Bluesky</span>
              </Link>
              <Link 
                href="https://github.com/koyuawsmbrtn/openscoreboard" 
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;