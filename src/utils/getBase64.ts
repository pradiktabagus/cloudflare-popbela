const getBase64ImageFromUrl = async (imageUrl: string) => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result);
      },
      false
    );

    reader.onerror = () => {
      return reject();
    };
    reader.readAsDataURL(blob);
  });
};
export default getBase64ImageFromUrl;
