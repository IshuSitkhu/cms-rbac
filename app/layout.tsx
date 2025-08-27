

import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: "RBAC",
  description: "Role-Based Access Control using Next.js and MongoDB",
  keywords: "Next.js, MongoDB, RBAC, Admin Dashboard, Role-Based Access Control",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Fallback if metadata.icons is not used */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body >
      
        <main>{children}</main>

        <footer className="bg-gray-200 text-gray-700 p-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </footer>
        </body>
    </html>
  );
}