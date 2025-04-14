'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

// Placeholder data - replace with your actual product data source
const products = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 30}/400/400`,
  description: `This is a detailed description of Product ${i + 1}. It is a wonderful product that you should definitely buy!`,
  price: (Math.random() * 100).toFixed(2), // Random price for demonstration
}));

interface Product {
  id: number;
  name: string;
  imageSrc: string;
  description: string;
  price: string;
}

async function getProduct(id: string): Promise<Product | undefined> {
  // Simulate fetching product data (replace with your actual data fetching logic)
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  const productId = parseInt(id, 10);
  return products.find((product) => product.id === productId);
}


interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const productId = parseInt(React.use(Promise.resolve(params)).id);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="md:w-3/4 lg:w-1/2">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>More details about this product</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-md object-cover"
          />
          <p>{product.description}</p>
          <p className="text-lg font-semibold">Price: ${product.price}</p>
          {/* Add more details here as needed */}
        </CardContent>
      </Card>
    </div>
  );
}



