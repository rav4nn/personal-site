import Link from "next/link";

import { GridWrapper } from "./GridWrapper";

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}


const footerLinks: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/toolbox", label: "Toolbox" },
  // { href: "/blog", label: "Blog" },
  // { href: "/speaking", label: "Speaking" },
];

export function Footer(): JSX.Element {
  const renderFooterLink = (link: FooterLink): JSX.Element => {
    if (link.isExternal) {
      return (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      );
    }
    return <Link href={link.href}>{link.label}</Link>;
  };

  return (
    <>
      <div className="relative max-w-7xl border-border-primary/50">
        <GridWrapper>
          <div className="max-w-6xl divide-y px-4 lg:mx-auto lg:flex lg:divide-x lg:px-4 xl:px-0">
            <div className="flex w-full py-6 text-sm">
              <div>
                <div className="flex-grow space-y-6">
                  <Link className="inline-block text-sm font-semibold tracking-tight text-text-primary" href="/">
                    hardeep.cv
                  </Link>
                  <p className="w-60 leading-5 text-gray-500">
                    I&apos;m Hardeep - an AI engineer that turns messy
                    real-world data into usable systems.
                  </p>
                </div>
                <p className="mt-6 text-gray-500">
                  © {new Date().getFullYear()} Hardeep Singh
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-end justify-between py-6 text-xs lg:pl-16">
              <ul className="flex flex-col space-y-2 text-sm text-gray-500 lg:items-end">
                {footerLinks.map((link) => (
                  <li className="hover:text-text-primary" key={link.href}>
                    {renderFooterLink(link)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GridWrapper>
      </div>
      <div className="relative h-8 w-full [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px]"></div>
    </>
  );
}
