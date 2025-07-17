"use client"
import { UserButton } from '@clerk/nextjs';
import React, { useState } from 'react'

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from 'next/link';

function AppHeader() {
  
  const navItems = [
    {
      name: "Home",
      link: "/dashboard",
    },
    {
      name: "History",
      link: "/dashboard/history",
    },
    // {
    //   name: "Pricing",
    //   link: "/pricing",
    // },
    // {
    //   name: "Profile",
    //   link: "/profile",
    // }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems 
          items={navItems}
          
           />
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center gap-5">
              <UserButton />
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center gap-5">
                <UserButton />
                </div>
                
              
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}

export default AppHeader
