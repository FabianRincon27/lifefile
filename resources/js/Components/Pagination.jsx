import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    const validLinks = links.filter((link) => link.url !== null);

    return (
        <nav className="flex items-center space-x-1" aria-label="Pagination">
            {validLinks.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    className={`
                        relative inline-flex items-center px-4 py-2 text-sm font-medium border
                        ${
                            link.active
                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }
                        ${index === 0 ? "rounded-l-md" : ""}
                        ${index === validLinks.length - 1 ? "rounded-r-md" : ""}
                        ${
                            link.url === null
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    preserveState
                    preserveScroll
                />
            ))}
        </nav>
    );
};

export default Pagination;
