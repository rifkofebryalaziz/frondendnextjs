import { TProduct } from './types/products.type';
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const endPoint = "https://dummyjson.com/products";

const Page = async ({ searchParams }: Props) => {
  const id = searchParams.id as string | undefined;

  if (id) {
    // 🔹 Ambil detail product by ID
    const response = await fetch(`${endPoint}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return <div>Product not found</div>;
    }

    const rawProduct = await response.json();

    // 🔹 Ambil hanya field sesuai TProduct
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

    // 🔹 Output dalam format JSON sesuai TProduct
    return (
      <pre className="text-sm">
        {JSON.stringify({ products: [product] }, null, 2)}
      </pre>
    );
  }

  // 🔹 Kalau tidak ada id, ambil list product
  const response = await fetch(endPoint, {
    cache: "no-store",
  });

  const data = await response.json();

  // 🔹 Ambil hanya field sesuai TProduct
  const products: TProduct[] = data.products.map((p: any) => ({
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
    <div>
      {products.map((product) => (
        <div key={product.id} className="mb-4">
          <p className="text-2xl font-semibold">{product.title}</p>
          <p className="text-base">{product.description}</p>
          <Link href={`/products?id=${product.id}`}>
            Goto {product.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Page;