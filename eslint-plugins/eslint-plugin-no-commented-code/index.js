export default {
  rules: {
    'no-commented-code': (await import('./rules/no-commented-code.js')).default,
  },
};
