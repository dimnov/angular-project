export interface Book {
  id: string;
  author: string;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  isFavorite?: boolean
}