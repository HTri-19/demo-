export type ProductStatus = "active" | "unactive";

export interface IProductImage {
  id: number;
  product_id: number;
  image: string;
  created_at?: string;
}

export interface IRamOption {
  id: number;
  name: string;
  value: string;
}

export interface IStorageOption {
  id: number;
  name: string;
  value: string;
}

export interface ICategoryOption {
  id: number;
  name: string;
}

export interface IProductVariant {
  id: number;
  product_id: number;
  sku: string;
  model_name: string;
  price: number;
  quantity: number;
  ram_id?: number | null;
  storage_id?: number | null;
  stock?: number | null;
  warranty_months?: number | null;
  created_at?: string;
  updated_at?: string;
  ram?: IRamOption | null;
  storage?: IStorageOption | null;
}

export interface IAdminProduct {
  id: number;
  name: string;
  category_id: number;
  description: string | null;
  status: ProductStatus | null;
  // Derived/display fields (optional on BE)
  price?: number | null;
  stock?: number | null;
  thumbnail?: string | null;
  category?: {
    id: number;
    name: string;
  } | null;
  images?: IProductImage[];
  variants?: IProductVariant[];
  created_at?: string;
  updated_at?: string;
}

export interface ProductFormPayload {
  name: string;
  category_id: number;
  description?: string | null;
  status?: ProductStatus | null;
  images?: Array<{ id?: number; image: string } | string>;
  variants?: Array<{
    id?: number;
    sku?: string;
    model_name?: string;
    price?: number;
    quantity?: number;
    ram_id?: number | null;
    storage_id?: number | null;
    stock?: number | null;
    warranty_months?: number | null;
  }>;
}
