import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Дмитрий Лобанов | QA Engineer",
  description: "QA Engineer с фокусом на тестирование симуляторов, десктопных приложений, аппаратно-программных комплексов и VR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased dark font-sans">
      <head>
        <link rel="stylesheet" href="https://static.tildacdn.net/css/fonts-tildasans.css" />
      </head>
      <body className="min-h-full flex flex-col bg-[#030303] text-white font-sans">{children}</body>
    </html>
  );
}
