"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import SegmentEditor from "@/components/SegementEditor";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">All Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products found matching the conditions.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6">Segment Editor</h2>
      <SegmentEditor onResult={(result) => setProducts(result)} />
    </main>
  );
}
