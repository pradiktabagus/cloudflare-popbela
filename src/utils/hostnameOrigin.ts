function getHostFromEnv() {
  switch (process.env.APP_ENV) {
    case 'development':
      return 'http://localhost:3000';
    case 'production':
      return 'https://www.popbela.com';
    case 'staging':
      return 'https://www.sotogubeng.com';
    default:
      return 'https://www.popbela.com';
  }
}
function hostNameOrigin() {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : getHostFromEnv();
  return origin;
}
export { hostNameOrigin };
