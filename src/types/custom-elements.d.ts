import type { DetailedHTMLProps, HTMLAttributes } from "react";

// React 19's `react-jsx` runtime resolves IntrinsicElements from `React.JSX`
// (via react/jsx-runtime), not the classic global `JSX` namespace, so the
// augmentation has to target the "react" module.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      /** The AI homework chatbot, from need-home-work's `src/webcomponent.ts`. */
      "need-homework-app": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          theme?: "light" | "dark";
          lang?: "en" | "fr" | "es";
          subject?: string;
          "grade-level"?: number | string;
          context?: string;
        },
        HTMLElement
      >;
    }
  }
}
