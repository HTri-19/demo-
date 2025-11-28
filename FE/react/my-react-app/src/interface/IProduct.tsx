import type { ICategory } from "./ICategory";
import type { IProductVariant } from "./IProductVariant";

export interface IProduct {
  id: number;
  name: string;
  category_id: number;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  price?: number;

  image?: string; // cũ – API không dùng
  images?: string; // mới – API trả về string ảnh

  category: ICategory;
  variants?: IProductVariant[];
}
