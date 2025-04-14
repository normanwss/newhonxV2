'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

// Placeholder data (replace with your actual data)
const companyName = 'Acme Corp';
const productCategories = [
  {
    label: 'Category 1',
    items: [
      [
        {
          label: 'Subcategory 1-1',
          url: '#',
        },
        {
          label: 'Subcategory 1-2',
          url: '#',
        },
      ],
    ],
  },
  {
    label: 'Category 2',
    items: [
      [
        {
          label: 'Subcategory 2-1',
          url: '#',
        },
        {
          label: 'Subcategory 2-2',
          url: '#',
        },
      ],
    ],
  },
  {
    label: 'Category 3',
    items: null,
  },
];

const products = Array.from({length: 20}, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 30}/200/150`,
  description: `This is a short description of Product ${i + 1}.`,
}));

const companyProfile = {
  imageSrc: 'https://picsum.photos/id/90/200/150',
  description:
    'Acme Corp is a leading provider of innovative solutions. Our mission is to deliver exceptional value to our customers through cutting-edge technology and unparalleled service.',
};

const companyAdvantages = Array.from({length: 5}, (_, i) => ({
  imageSrc: `https://picsum.photos/id/${i + 40}/300/100`,
  altText: `Advantage ${i + 1}`,
}));

const successStories = Array.from({length: 15}, (_, i) => ({
  caseName: `Success Story ${i + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 70}/200/150`,
}));

const contactInfo = {
  title: 'Contact Us',
  qrCodeImage: 'https://www.primefaces.org/primereact/showcase/demo/images/qr-code.png',
  address: '123 Main Street, Anytown USA',
  phone: '555-123-4567',
  email: 'info@example.com',
};

export default function Home() {
  const [isContactCardVisible, setIsContactCardVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || product.name.startsWith(selectedCategory))
  );

  return (
    <div className="min-h-screen relative">

      {/* Company Name */}
      <div className="bg-secondary p-4 text-center text-lg font-semibold">
        {companyName}
      </div>

      {/* Product Category Menu */}
      <div className="relative bg-secondary">
        <ul className="flex space-x-4 p-4">
          {productCategories.map(category => (
            <li key={category.label} className="relative group">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(category.label);
                }}
                className={cn(
                  "block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
                  selectedCategory === category.label ? "bg-gray-200 dark:bg-gray-700" : ""
                )}
              >
                {category.label}
                {category.items && <>&nbsp;&#9662;</>}
              </Link>
              {category.items && (
                <ul className="absolute left-0 mt-2 py-2 w-48 bg-white border rounded shadow-md z-10 hidden group-hover:block">
                  {category.items.map((subCategoryGroup, index) => (
                    <li key={index}>
                      <ul>
                        {subCategoryGroup.map(subCategory => (
                          <li key={subCategory.label}>
                            <Link
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategory(subCategory.label);
                              }}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {subCategory.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Image Carousel */}
      <div className="overflow-hidden">
        <div className="flex animate-horizontal-scroll">
          {products.slice(0, 10).map(product => (
            <Image
              key={product.id}
              src={product.imageSrc}
              alt={product.name}
              width={200}
              height={150}
              className="mr-4 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Company Profile */}
      <Card className="h-48 overflow-hidden mt-4">
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <Image
            src={companyProfile.imageSrc}
            alt="Company"
            width={100}
            height={75}
            className="mr-4 rounded-md"
          />
          <CardDescription>
            {companyProfile.description.length > 150
              ? `${companyProfile.description.substring(0, 150)}...`
              : companyProfile.description}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Search Box */}
      <div className="p-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Product Center */}
      <div className="grid grid-cols-5 gap-4 p-4">
        {filteredProducts.slice(0, 20).map(product => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <Card className="cursor-pointer">
              <Image
                src={product.imageSrc}
                alt={product.name}
                width={200}
                height={150}
                className="rounded-md object-cover"
              />
              <CardContent>
                <CardTitle className="text-sm">{product.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Company Advantages */}
      <div className="overflow-hidden mt-4">
        <div className="flex animate-horizontal-scroll">
          {companyAdvantages.map((advantage, index) => (
            <Image
              key={index}
              src={advantage.imageSrc}
              alt={advantage.altText}
              width={300}
              height={100}
              className="mr-4 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="grid grid-cols-5 gap-4 p-4">
        {successStories.slice(0, 15).map((story, index) => (
          <Card key={index}>
            <Image
              src={story.imageSrc}
              alt={story.caseName}
              width={200}
              height={150}
              className="rounded-md object-cover"
            />
            <CardContent>
              <CardTitle className="text-sm">{story.caseName}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Information Card */}
      {isContactCardVisible && (
        <div
          className="fixed top-1/2 transform -translate-y-1/2 right-4 z-50 w-80 bg-white rounded-md shadow-lg p-4"
          style={{maxHeight: '80vh', overflowY: 'auto'}}
        >
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setIsContactCardVisible(false)}>
              Hide
            </Button>
          </div>
          <CardTitle>{contactInfo.title}</CardTitle>
          <CardContent>
            <Image
              src={contactInfo.qrCodeImage}
              alt="QR Code"
              width={100}
              height={100}
              className="mx-auto mb-2"
            />
            <CardDescription>Address: {contactInfo.address}</CardDescription>
            <CardDescription>Phone: {contactInfo.phone}</CardDescription>
            <CardDescription>Email: {contactInfo.email}</CardDescription>
          </CardContent>
        </div>
      )}

      {/* Toggle Button */}
      {!isContactCardVisible && (
        <Button
          onClick={() => setIsContactCardVisible(true)}
          className="fixed top-1/2 transform -translate-y-1/2 right-4 z-50"
        >
          Contact Us
        </Button>
      )}

      {/* Bottom Menu */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center p-4 border-t border-gray-200 mt-4"
      >
        <Link href="#" className="hover:bg-gray-100 p-2 rounded">
          About Us
        </Link>
        <Link href="#" className="hover:bg-gray-100 p-2 rounded">
          Products
        </Link>
        <Link href="#" className="hover:bg-gray-100 p-2 rounded">
          Services
        </Link>
        <Link href="#" className="hover:bg-gray-100 p-2 rounded">
          Contact
        </Link>
      </div>
    </div>
  );
}


