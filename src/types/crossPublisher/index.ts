export type MappingPublisher = {
  category: CategoryPublisher;
};
export type ItemPublisher = {
  name: string;
  type: string;
  category?: string;
  subCategory?: string;
};
export type CategoryPublisher = {
  category: 'fashion' | 'beauty' | 'career' | 'lifestyle' | 'relationship';
  publisher: Array<ItemPublisher>;
};
