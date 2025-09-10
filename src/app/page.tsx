"use client";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";

/**
 * Home page not used.
 * A redirect is used to load the correct instrument.
 * @returns
 */
export default function Home() {
  const isDarkMode = useSelector(selectIsDarkMode);
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-slate-800"
      }`}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
}
