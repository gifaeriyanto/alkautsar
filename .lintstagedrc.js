const micromatch = require("micromatch");

const checkFolder = [
  'components',
  'hooks',
  'pages',
  'services',
  'store',
  'types',
  'utils',
  'app',
  'models',
  'src',
  'demo',
  '[locale]'
];

module.exports = (files) => {
  const codeMatch = checkFolder.map((fd) => `**/${fd}/**/*.{js,ts,jsx,tsx}`);
  let lintFiles = micromatch(files, codeMatch);

  const listCommand = [`yarn run format`];

  if (lintFiles.length > 0) {
    listCommand.push(
      `yarn turbo run lint`,
      `yarn turbo run build:check`,
    );
  }

  return listCommand;
}
