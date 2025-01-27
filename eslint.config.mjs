import { FlatCompat } from "@eslint/eslintrc";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'build/**',
      'src/i18n/locales/**',  // 显式忽略所有JSON文件
    ],
    languageOptions: {
      ...reactPlugin.configs.recommended.languageOptions,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 0,
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any
      '@typescript-eslint/ban-ts-comment': 'off', // 允许使用 @ts-ignore
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言
      '@typescript-eslint/no-var-requires': 'off', // 允许使用 CommonJS 的写法
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-debugger': 'warn',
      "import/order": [
        "error",
        {
          //按照分组顺序进行排序
          "groups": ["builtin", "external", "parent", "sibling", "index", "internal", "object", "type"],
          //通过路径自定义分组
          "pathGroups": [
            {
              "pattern": "react*",
              "group": "builtin",
              "position": "before"
            },
            {
              "pattern": "@/components/**",
              "group": "parent",
              "position": "before"
            },
            {
              "pattern": "@/utils/**",
              "group": "parent",
              "position": "after"
            },
            {
              "pattern": "@/apis/**",
              "group": "parent",
              "position": "after"
            }
          ],
          "pathGroupsExcludedImportTypes": ["react"],
          "newlines-between": "always", //每个分组之间换行
          //根据字母顺序对每个组内的顺序进行排序
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        },
      ]
    },
  }
];

export default eslintConfig;
