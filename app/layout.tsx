import type { Metadata } from "next";
import { Cairo, Sora } from "next/font/google";
import { AmplifyClientProvider } from "@/components/AmplifyClientProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jamago.qa"),
  title: {
    default: "Jamago Security Systems Doha",
    template: "%s | Jamago Security",
  },
  description:
    "Bilingual security systems website for Doha: CCTV, access control, intercom, compliance guidance, and maintenance contracts.",
  openGraph: {
    title: "Jamago Security Systems Doha",
    description:
      "Security systems supply, installation, maintenance, and compliance support in Doha.",
    type: "website",
    url: "https://jamago.qa",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${cairo.variable}`}>
        <AmplifyClientProvider>{children}</AmplifyClientProvider>
      </body>
    </html>
  );
}
