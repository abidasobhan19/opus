import './globals.css';

export const metadata = {
  title: 'OPUS — Order Portal',
  description: 'Portal for ordering printed materials created by Tryckeriett.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Nunito:wght@800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
