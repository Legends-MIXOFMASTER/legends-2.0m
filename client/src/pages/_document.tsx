import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Font imports if not using Next.js Font optimization */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
