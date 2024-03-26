import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          href={link.url || " "}
          key={link.label}
          className={
            "inline-block py-2 px-3 rounded-lg text-xs " +
            (link.active ? "bg-gray-950 text-white " : " ") +
            (!link.url
              ? "text-gray-300 dark:text-gray-500 cursor-not-allowed "
              : "hover:bg-gray-950 hover:text-white")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}
