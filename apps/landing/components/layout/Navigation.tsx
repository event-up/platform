'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Who It\'s For', href: '#audience' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-2 md:top-4 left-0 right-0 z-50 flex justify-center px-2 md:px-4">
        <div
          className={`flex items-center gap-2 md:gap-4 lg:gap-6 px-3 md:px-4 lg:px-6 py-2 md:py-3 rounded-full smooth-transition ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-lg shadow-lg'
              : 'bg-white/85 backdrop-blur-md shadow-md'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/eventup-logo-full.svg"
              alt="EventUp Logo"
              width={120}
              height={32}
              className="h-6 md:h-7 w-auto"
              priority
            />
          </Link>

          {/* Vertical Divider */}
          <div className="hidden md:block h-5 md:h-6 w-px bg-gray-200" />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-gray-600 hover:text-primary smooth-transition whitespace-nowrap px-3 py-1.5 rounded-full hover:bg-primary/5"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block h-5 md:h-6 w-px bg-gray-200" />

          {/* Sign Up Button */}
          <Button variant="primary" size="sm" href="#get-started" className="flex-shrink-0 text-sm px-3 md:px-5 hidden md:flex">
            Get Started Free
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 smooth-transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="fixed top-16 left-4 right-4 z-40 rounded-2xl bg-white/95 backdrop-blur-lg shadow-xl border border-gray-100 p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-xl smooth-transition"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-1" />
            <Button variant="primary" size="sm" href="#get-started" className="w-full text-center justify-center">
              Get Started Free
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
