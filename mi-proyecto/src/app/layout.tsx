import Image from "next/image";
import "./globals.css";
import Nav from "@/componentes/Nav";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-zinc-950 text-white">
        <header className="flex flex-col items-center justify-center p-6 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Logo Teatro Ya"
              width={60}
              height={60}
              priority
            />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-amber-500">
              TEATRO YA
            </h1>
          </div>
          <Nav />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}