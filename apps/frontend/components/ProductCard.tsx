import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded shadow w-full md:w-1/3">
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p>Price: ₹{product.price}</p>
      <p>Status: {product.stock_status}</p>
      <p>Category: {product.category}</p>
      <p>Tags: {product.tags.join(", ")}</p>
      {product.on_sale && <span className="text-green-500 font-bold">On Sale</span>}
    </div>
  );
}
