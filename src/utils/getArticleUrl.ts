export const getArticleUrl = (value: string) => {
  const parent = document.createElement('div');
  parent.innerHTML = value;
  const tagName = parent.getElementsByTagName('a')[0]?.pathname;
  return tagName;
};
