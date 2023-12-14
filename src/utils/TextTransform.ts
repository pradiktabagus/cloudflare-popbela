function toSafetyStringSEO(value?: string) {
  return value?.replace(/"|'|;|{|}/g, '');
}
export { toSafetyStringSEO };
