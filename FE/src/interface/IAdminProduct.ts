export type ProductStatus = "active" | "unactive";

export interface IAdminProduct {
  id: number;
  name: string;
  category_id: number;
  description: string | null;
  status: ProductStatus | null;
  price?: number | null;
  stock?: number | null;
  thumbnail?: string | null;
  category?: {
    id: number;
    name: string;
  } | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFormPayload {
  name: string;
  category_id: number;
  description?: string | null;
  status?: ProductStatus | null;
}
