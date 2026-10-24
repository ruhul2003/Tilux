import "./globals.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Tilux | Architectural Surfaces & Luxury Tiles",
  description: "Curated collection of architectural marble, porcelain, and ceramic surfaces engineered for contemporary interior and outdoor spaces.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="dark" lang="en" className="dark bg-[#09090b]">
      <body className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 antialiased overflow-x-hidden">
        <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            style: {
              background: "#18181b",
              color: "#f4f4f5",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backdropFilter: "blur(12px)",
            },
            success: {
              iconTheme: {
                primary: "#E6C65C",
                secondary: "#18181b",
              },
            },
          }}
        />
        
        <header className="sticky top-0 z-50 main-nav-header">
          <NavBar />
        </header>

        <main className="flex-grow w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}