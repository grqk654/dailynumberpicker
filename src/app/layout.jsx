import "./globals.css";
import Nav from '../components/ui/Nav';
import Footer from '../components/ui/Footer';

export const metadata = {
  title: { default: "Daily Number Picker — NY Pick 3 & Win-4 Analysis Engine", template: "%s | DailyNumberPicker" },
  description: "Free NY Pick 3 and Win-4 number picker powered by 45 years of draw history. Skip tracking, hot/cold digits, master digit wheeling. Updated daily.",
  keywords: ["daily numbers", "number picker", "NY Pick 3", "Win-4", "lottery analysis", "pick 3 strategy"],
  openGraph: {
    title: "Daily Number Picker — NY Lottery Analysis Engine",
    description: "Pick 3 & Win-4 analysis powered by 45 years of NY draw data.",
    url: "https://dailynumberpicker.com",
    siteName: "Daily Number Picker",
    type: "website",
  },
  metadataBase: new URL("https://dailynumberpicker.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
