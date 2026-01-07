export interface MenuItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  image_url: string;
  category: string;
  is_active: boolean;
  is_featured: boolean;
  // ستون‌های جدید سوپابیس برای فیلترینگ
  is_chef_suggested?: boolean;
  is_best_seller?: boolean;
  has_discount?: boolean;
  is_daily_special?: boolean;
}