"use client";

import { Provider } from "react-redux";
import { store } from "../store";

export default function TestPage() {
  return (
    <Provider store={store}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test Page - App Loaded Successfully!</h1>
        <p>If you can see this, the basic app infrastructure is working.</p>
        <p className="mt-4">
          <a href="/" className="text-blue-500 underline">Go back to main app</a>
        </p>
      </div>
    </Provider>
  );
}