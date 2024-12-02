module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    // NOTE: react comes first
    '^react',
    // NOTE: npm packages
    '<THIRD_PARTY_MODULES>',
    // NOTE: Parent folder relative import
    '^\\.\\.(?!/?$)',
    '^\\.\\./?$',
    // NOTE: other same folder relative import
    '^\\./(?=.*/)(?!/?$)',
    '^\\.(?!/?$)',
    '^\\./?$',
  ],
  importOrderSortSpecifiers: true,
};
