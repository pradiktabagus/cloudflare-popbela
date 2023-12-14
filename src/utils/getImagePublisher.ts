export default function getImagePublisher(publisher: string) {
  switch (publisher) {
    case 'idntimes':
      return 'https://image.popbela.com/content-images/post/20230216/image-6-1fbd1931b9b9a5b6d9e053b903f5bf8e.png';
    case 'popmama':
      return 'https://image.popbela.com/content-images/post/20230216/image-9-bfa63fd9408b49ebf09867bcb357aa42.png';
    case 'fortune':
      return 'https://image.fortuneidn.com/logo/fortune_logo.png';
    default:
      return 'https://image.popbela.com/content-images/post/20230216/image-6-1fbd1931b9b9a5b6d9e053b903f5bf8e.png';
  }
}
