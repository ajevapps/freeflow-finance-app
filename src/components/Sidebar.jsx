import { NavLink } from "react-router-dom";

import {
  APP_NAME,
  NAV_LINKS,
} from "../utils/constants";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          {APP_NAME}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}