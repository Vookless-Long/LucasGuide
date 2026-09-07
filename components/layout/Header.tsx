import { IconBooks, IconHome, IconUser } from "@tabler/icons-react";
import { HeaderNav } from "./HeaderNav";

export function Header() {
  const navItems = [
    { href: "/", label: "Home", icon: IconHome },
    { href: "/all-guides", label: "All Guides", icon: IconBooks },
    { href: "/about-us", label: "About", icon: IconUser },
  ];

  return <HeaderNav navItems={navItems} logoHref="/" />;
}
