module.exports = {
  '*.{json,md}': 'prettier --write',
  '*.{js,ts,tsx}': [
    'yarn lint --rule "prettier/prettier: off"',
    'prettier --write',
  ],
};
