import { supabase } from "@/lib/supabase";
import { MenuItem } from "@/types/menu";

// دریافت همه آیتم‌های فعال
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const { data, error } = await supabase
    .from<MenuItem>("menu_items")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
};

// دریافت یک آیتم بر اساس id
export const getMenuItemById = async (id: string): Promise<MenuItem | null> => {
  const { data, error } = await supabase
    .from<MenuItem>("menu_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getMenuItemById error:", error);
    return null;
  }

  return data || null;
};

// ایجاد آیتم جدید
export const createMenuItem = async (item: Partial<MenuItem>): Promise<MenuItem | null> => {
  const { data, error } = await supabase
    .from<MenuItem>("menu_items")
    .insert(item)
    .select();

  if (error) {
    console.error("createMenuItem error:", error);
    return null;
  }

  return data ? data[0] : null;
};

// آپدیت آیتم
export const updateMenuItem = async (id: string, item: Partial<MenuItem>): Promise<MenuItem | null> => {
  const { data, error } = await supabase
    .from<MenuItem>("menu_items")
    .update(item)
    .eq("id", id)
    .select();

  if (error) {
    console.error("updateMenuItem error:", error);
    return null;
  }

  return data ? data[0] : null;
};

// حذف آیتم
export const deleteMenuItem = async (id: string): Promise<MenuItem | null> => {
  const { data, error } = await supabase
    .from<MenuItem>("menu_items")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("deleteMenuItem error:", error);
    return null;
  }

  return data ? data[0] : null;
};

// جستجوی زنده (Live Search) بر اساس query
export const getMenuItemsByQuery = async (query: string): Promise<MenuItem[]> => {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from<MenuItem>("menu_items")
    .select("*")
    .eq("is_active", true)           // فقط آیتم‌های فعال
    .ilike("title", `%${query}%`)    // جستجوی غیر حساس به حروف بزرگ/کوچک
    .order("title", { ascending: true }) // مرتب‌سازی قابل پیش‌بینی
    .limit(10);                       // محدودیت تعداد نتایج

  if (error) {
    console.error("getMenuItemsByQuery error:", error);
    return [];
  }

  return data || [];
};
