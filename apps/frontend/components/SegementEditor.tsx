"use client";

import { useState } from "react";
import { segmentApi } from "@/services/api";
import { Product } from "@/types/product";

export default function SegmentEditor({ onResult }: { onResult: (products: Product[]) => void }) {
  const [rules, setRules] = useState("");
  const [error, setError] = useState("");
  const [jsonResult, setJsonResult] = useState<Product[] | null>(null);

  const evaluate = async () => {
    setError(""); 
    setJsonResult(null); 

    try {
      const res = await segmentApi.post<Product[]>("/segments/evaluate", { rules });

      if (res.data.length === 0) {
        setError("No products found matching the conditions.");
      }

      onResult(res.data);

      setJsonResult(res.data);
    } catch (e: any) {
      setError("Something went wrong. Please check your rules or try again.");
    }
  };

  const reset = () => {
    setRules("");
    setJsonResult(null);
    setError("");
    onResult([]); // Clear product cards
  };

  return (
    <div className="max-w-2xl border border-white p-6 bg-transparent rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-4">Define Filter Conditions</h2>

      <label className="block text-gray-700 mb-2 font-medium">
        Enter filter rules one per line:
      </label>

      <textarea
        value={rules}
        onChange={(e) => setRules(e.target.value)}
        rows={6}
        placeholder={`price > 5000\ncategory = Smartphones\nstock_status = instock\nbrand != Samsung\nrating >= 4.0`}
        className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm mb-3"
      />

      <div className="text-sm text-gray-500 mb-4">
        <strong>Examples:</strong> price &gt; 5000, category = Smartphones, stock_status = instock
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={evaluate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Evaluate Filter
        </button>

        <button
          onClick={reset}
          className="flex items-center gap-2 border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-transparent hover:text-white"
        >
          Reset
        </button>
      </div>

      <div className="text-xs text-gray-500 italic">
        Supported operators: =, !=, &gt;, &lt;, &gt;=, &lt;=
      </div>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

      {jsonResult && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Filtered Products:</h3>
          <pre className="p-4 bg-transparent rounded text-sm overflow-x-auto max-h-[400px]">
{JSON.stringify(jsonResult, null, 2)}
          </pre> 
          {/* <pre> = Preformatted Text
Preserves whitespace and line breaks */}
        </div>
      )}
    </div>
  );
}
