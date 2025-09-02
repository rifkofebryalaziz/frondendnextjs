import { TProduct } from "./types/products.type";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const endPoint = "https://dummyjson.com/products";

const Page = async ({ searchParams }: Props) => {
  const id = searchParams.id as string | undefined;

  // 🔹 Jika ada ID → tampilkan detail product
  if (id) {
    const response = await fetch(`${endPoint}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return <div>Product not found</div>;
    }

    const rawProduct: TProduct = await response.json();

    const product: TProduct = {
      id: rawProduct.id,
      title: rawProduct.title,
      description: rawProduct.description,
      category: rawProduct.category,
      price: rawProduct.price,
      discountPercentage: rawProduct.discountPercentage,
      rating: rawProduct.rating,
      stock: rawProduct.stock,
    };

    return (
      <div className="p-6 space-y-3">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-lg">{product.description}</p>
        <ul className="space-y-1">
          <li>
            <b>Category:</b> {product.category}
          </li>
          <li>
            <b>Price:</b> ${product.price}
          </li>
          <li>
            <b>Discount:</b> {product.discountPercentage}%
          </li>
          <li>
            <b>Rating:</b> {product.rating}
          </li>
          <li>
            <b>Stock:</b> {product.stock}
          </li>
        </ul>
        <Link href="/products" className="underline">
          ← Back to products
        </Link>
      </div>
    );
  }

  // 🔹 Jika tidak ada ID → tampilkan list product
  const response = await fetch(endPoint, {
    cache: "no-store",
  });

  if (!response.ok) {
    return <div>Failed to fetch products</div>;
  }

  const data: { products: TProduct[] } = await response.json();

  const products: TProduct[] = data.products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    price: p.price,
    discountPercentage: p.discountPercentage,
    rating: p.rating,
    stock: p.stock,
  }));

  return (
    <div className="p-6 space-y-6">
      {products.map((product) => (
        <div key={product.id} className="border-b pb-4">
          <p className="text-2xl font-semibold">{product.title}</p>
          <p className="text-base text-gray-600">{product.description}</p>
          <Link
            href={`/products?id=${product.id}`}
            className="text-blue-600 underline"
          >
            Goto {product.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
