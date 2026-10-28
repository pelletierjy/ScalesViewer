import type { DetailedHTMLProps, HTMLAttributes } from "react";

// The ConversiaCore widget's client credential, injected at runtime by the host app
// before its first AI request (ConversiaCore feature 002-secure-embed-telemetry, FR-020).
// See HomeworkPanel's injectClientCredential() and ConversiaCore's
// specs/002-secure-embed-telemetry/contracts/embedder-injection.md.
declare global {
  interface Window {
    conversiaClient?: {
      version: number;
      remoteId: string;
      key: string;
    };
  }
}

// React 19's `react-jsx` runtime resolves IntrinsicElements from `React.JSX`
// (via react/jsx-runtime), not the classic global `JSX` namespace, so the
// augmentation has to target the "react" module.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      /** The AI homework chatbot, from conversia-app's `src/webcomponent.ts`. */
      "conversia-app": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          theme?: "light" | "dark";
          lang?: "en" | "fr" | "es" | "zh-CN";
          subject?: string;
          "grade-level"?: number | string;
          context?: string;
        },
        HTMLElement
      >;
    }
  }
}
