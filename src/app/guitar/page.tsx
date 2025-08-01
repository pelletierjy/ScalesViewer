"use client";
import React from "react";
import { GuitarNeck } from "./GuitarNeck/GuitarNeck";
import { Configuration } from "./Configuration/Configuration";
import { DataProvider } from "./context";

export default function Guitar() {

  return (
    <div className="w-full space-y-6">
      <DataProvider>
        <GuitarNeck />
        <Configuration />
      </DataProvider>
    </div>
  );
}
