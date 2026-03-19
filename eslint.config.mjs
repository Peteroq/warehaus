import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".vercel/", ".shipstudio/", ".next/", "node_modules/"],
  },
  ...nextConfig,
];

export default eslintConfig;
