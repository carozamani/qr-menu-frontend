"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMenuItemById } from "@/lib/queries/menu";
import MenuLoader from "@/components/menu/MenuLoader";
import MenuDetails from "@/components/menu/details/MenuDetails";


export default function MenuItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getMenuItemById(id as string)
        .then(setItem)
        .catch(console.error);
    }
  }, [id]);

  if (!item) return <MenuLoader />;

  return <MenuDetails {...item} />;
}