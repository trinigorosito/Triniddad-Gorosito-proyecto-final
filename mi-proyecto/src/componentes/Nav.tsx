import Link from "next/link";

export default function Nav() {
  return (
    <nav className="mt-4">
      <ul className="flex items-center justify-center gap-6 text-sm font-medium text-zinc-300">
        <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
        <li><Link href="/nosotros" className="hover:text-amber-500 transition-colors">Nosotros</Link></li>
        <li><Link href="/novedades" className="hover:text-amber-500 transition-colors">Novedades</Link></li>
        <li><Link href="/cartelera" className="hover:text-amber-500 transition-colors">Cartelera</Link></li>
        <li><Link href="/genero" className="hover:text-amber-500 transition-colors">Género</Link></li>
        <li><Link href="/barrio" className="hover:text-amber-500 transition-colors">Barrio</Link></li>
        <li><Link href="/contacto" className="hover:text-amber-500 transition-colors">Contactanos</Link></li>
      </ul>
    </nav>
  );
}