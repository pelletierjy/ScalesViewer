import next from "eslint-config-next";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...next,
  {
    ignores: [
      "**/build/**",
      "**/.next/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/.claude/**",
      "**/out/**",
      "**/next-env.d.ts",
      "public/need-homework/**",
    ],
  },
  {
    rules: {
      "import/no-anonymous-default-export": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "react-hooks/preserve-manual-memoization": "off",
    },
  },
];

export default config;
