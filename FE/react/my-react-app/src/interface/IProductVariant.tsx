export interface IProductVariant {
  id: number;
  product_id: number;
  ram_id: number;
  storage_id: number;
  cpu_id: number;
  gpu_id: number;
  screen_size_id: number;
  battery_id: number;
  operating_system_id: number;
  weight_id: number;

  price_new: number | string;
  price_old: number | string;
  stock: number;
  status: string;
  image: string;

  created_at: string;
  updated_at: string;
}
