
import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Landchecker home"
        >
          <Image
            src="/icon.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="font-bold tracking-tight text-emerald-700">
            Landchecker
          </span>
        </Link>

        <p className="text-sm text-gray-500">
          Discover properties. Save your favorites.
        </p>

        <p className="text-xs text-gray-400">
          © {currentYear} Landchecker
        </p>
      </div>
    </footer>
  );
}

export default Footer;
