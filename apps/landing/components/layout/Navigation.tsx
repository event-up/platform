'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-2 md:top-4 left-0 right-0 z-50 flex justify-center px-2 md:px-4">
      <div
        className={`flex items-center gap-2 md:gap-4 lg:gap-6 px-3 md:px-4 lg:px-6 py-2 md:py-3 rounded-full smooth-transition ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg'
            : 'bg-white/80 backdrop-blur-md shadow-md'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/eventup-logo-full.svg"
            alt="Eventup Logo"
            width={120}
            height={32}
            className="h-6 md:h-7 w-auto"
            priority
          />
        </Link>

        {/* Vertical Divider */}
        <div className="h-5 md:h-6 w-px bg-gray-300" />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary smooth-transition whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-5 md:h-6 w-px bg-gray-300" />

        {/* Sign Up Button */}
        <Button variant="primary" size="sm" href="#signup" className="flex-shrink-0 text-sm px-3 md:px-4">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
