import { TProduct } from './types/products.type';
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const endPoint = "https://dummyjson.com/products";

const page = async (props: Props) => {
  const searchParams = await props.searchParams;

  const limit = searchParams.limit as string;
  const skip = searchParams.skip as string;

  const params = new URLSearchParams({
    limit: limit,
    skip: skip,
  });

  const response = await fetch(`${endPoint}?${params.toString()}`).then(
    async (response) => {
      const data = await response.json();
      return data;
    }
  );

  const products: TProduct[] = response.products;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p className="text-2xl">{product.title}</p>
          <p className="text-base">{product.description}</p>
          <Link href={`/products/${product.id}`}>Goto {product.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default page;