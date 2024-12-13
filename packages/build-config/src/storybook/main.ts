import type { StorybookConfig } from "@storybook/react-webpack5"

const config: StorybookConfig = {
  stories: [
    "../../src/**/*.mdx",
    "../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    'storybook-addon-mock',
  ],
  framework: "@storybook/react-webpack5",
  staticDirs: ['../../public'],
  // делает в .jsx импорт реакта не обязательным 
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  }),
}
export default config