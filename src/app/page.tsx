'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {Icons} from '@/components/icons';
import {cn} from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from "@/components/ui/button";

// Placeholder data (replace with your actual data)
const companyName = 'Acme Corp';
const productCategories = [
  {
    name: 'All',
    subcategories: [],
  },
  {
    name: 'Category 1',
    subcategories: ['Subcategory 1.1', 'Subcategory 1.2'],
  },
  {
    name: 'Category 2',
    subcategories: ['Subcategory 2.1', 'Subcategory 2.2', 'Subcategory 2.3'],
  },
  {
    name: 'Category 3',
    subcategories: [],
  },
  {
    name: 'Category 4',
    subcategories: ['Subcategory 4.1'],
  },
];

const products = Array.from({length: 30}, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  category:
    productCategories[Math.floor(i % productCategories.length)].name,
  imageSrc: `https://picsum.photos/id/${i + 10}/200/150`,
}));

const companyProfile = {
  imageSrc: 'https://picsum.photos/id/90/200/150',
  description:
    'Acme Corp is a leading provider of innovative solutions. ' +
    'With a commitment to excellence and customer satisfaction, ' +
    'we strive to deliver exceptional value and results.',
};

const companyAdvantages = Array.from({length: 5}, (_, i) => ({
  id: i,
  imageSrc: `https://picsum.photos/id/${i + 40}/300/100`,
}));

const successStories = Array.from({length: 15}, (_, i) => ({
  id: i,
  caseName: `Success Story ${i + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 70}/200/150`,
}));

const contactInfo = {
  title: 'Contact Us',
  qrCodeImage: 'https://www.primefaces.org/primereact/showcase/demo/images/qr-code.png',
  phoneNumber: '123-456-7890',
  address: '123 Main St, Anytown, USA',
  email: 'info@example.com',
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactCardVisible, setIsContactCardVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let initialProducts = products;

    if (selectedCategory !== 'All') {
      initialProducts = products.filter(
          product => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      initialProducts = initialProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(initialProducts);
  }, [selectedCategory, searchQuery]);

  const productCarouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (isPaused) return;
      if (productCarouselRef.current) {
        productCarouselRef.current.scrollLeft += 1;
        if (
          productCarouselRef.current.scrollLeft >=
          productCarouselRef.current.scrollWidth -
          productCarouselRef.current.clientWidth
        ) {
          productCarouselRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 20); // Adjust speed as needed

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const toggleContactCardVisibility = () => {
    setIsContactCardVisible(!isContactCardVisible);
  };

  return (
      <div className="flex flex-col min-h-screen">
        {/* Company Name */}
        <div className="bg-secondary p-4 text-center text-lg font-bold">
          {companyName}
        </div>

        {/* Product Category Menu */}
        <div className="flex flex-wrap justify-start gap-2 p-2">
          {productCategories.map(category => (
              category.subcategories.length > 0 ? (
                  <DropdownMenu key={category.name}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-md border p-2 hover:bg-accent hover:text-accent-foreground">
                        {category.name} ▾
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {category.subcategories.map(subcategory => (
                          <DropdownMenuItem key={subcategory} onClick={() => setSelectedCategory(subcategory)}>
                            {subcategory}
                          </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
              ) : (
                  <button
                      key={category.name}
                      className={cn(
                          'rounded-md border p-2',
                          selectedCategory === category.name
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                      )}
                      onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </button>
              )
          ))}
        </div>

        {/* Search Box */}
        <div className="p-4">
          <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Product Image Carousel */}
        <div
            className="overflow-hidden whitespace-nowrap p-4 relative"
            ref={productCarouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
          {filteredProducts.slice(0, 10).map(product => (
              <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="inline-block transition-transform duration-200 hover:scale-105"
              >
                <Image
                    src={product.imageSrc}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="rounded-md object-cover inline-block"
                />
              </Link>
          ))}
        </div>

        {/* Product Center */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {filteredProducts.slice(0, 20).map(product => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">
                    <div className="flex justify-center items-center h-32">
                      <Image
                          src={product.imageSrc}
                          alt={product.name}
                          width={200}
                          height={150}
                          className="rounded-md object-cover"
                          style={{maxWidth: '100%', maxHeight: '100%'}}
                      />
                    </div>
                    <CardContent>
                      <CardTitle className="text-sm">{product.name}</CardTitle>
                    </CardContent>
                  </Card>
                </Link>
            ))}
          </div>
        </div>

        {/* Company Profile */}
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Learn more about us</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Image
                  src={companyProfile.imageSrc}
                  alt="Company"
                  width={150}
                  height={100}
                  className="rounded-md object-cover mr-4"
              />
              <p className="h-24 overflow-hidden text-sm">
                {companyProfile.description}
                {companyProfile.description.length > 100 ? '...' : ''}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Advantages */}
        <div className="p-4">
          <h2>Company Advantages</h2>
          <div className="overflow-x-auto whitespace-nowrap">
            {companyAdvantages.map(advantage => (
                <Image
                    key={advantage.id}
                    src={advantage.imageSrc}
                    alt={`Advantage ${advantage.id}`}
                    width={300}
                    height={100}
                    className="rounded-md object-cover inline-block mr-4"
                />
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="p-4">
          <h2>Success Stories</h2>
          <div className="grid grid-cols-3 gap-4">
            {successStories.slice(0, 15).map(story => (
                <Link key={story.id} href={`/success-story/${story.id}`}>
                  <Card className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">
                    <div className="flex justify-center items-center h-32">
                      <Image
                          src={story.imageSrc}
                          alt={story.caseName}
                          width={200}
                          height={150}
                          className="rounded-md object-cover"
                      />
                    </div>
                    <CardContent>
                      <CardTitle className="text-sm">{story.caseName}</CardTitle>
                    </CardContent>
                  </Card>
                </Link>
            ))}
          </div>
        </div>

        {/* Contact Information Card */}
        {isContactCardVisible && (
            <div
                className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-card border rounded-md shadow-lg p-4 w-80 z-50 overflow-auto"
                style={{maxHeight: '80vh'}}>
              <div className="flex justify-end">
                <button
                    onClick={toggleContactCardVisibility}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <Icons.close className="h-5 w-5"/>
                </button>
              </div>
              <CardTitle>{contactInfo.title}</CardTitle>
              <CardContent>
                <Image
                    src={contactInfo.qrCodeImage}
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="rounded-md object-cover mb-4"
                />
                <CardDescription>
                  Phone: {contactInfo.phoneNumber}
                  <br/>
                  Address: {contactInfo.address}
                  <br/>
                  Email: {contactInfo.email}
                </CardDescription>
              </CardContent>
            </div>
        )}

        {/* Toggle Button */}
        {!isContactCardVisible && (
            <button
                onClick={toggleContactCardVisibility}
                className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-accent text-accent-foreground rounded-md shadow-lg p-2 z-50"
            >
              Contact Us
            </button>
        )}

        {/* Bottom Menu */}
        <div className="bg-white p-4 text-center fixed bottom-0 left-0 w-full mt-4">
          <p>
            © 2024 Acme Corp |{' '}
            <a href="#" className="hover:bg-teal-200 p-2 rounded-md">
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="#" className="hover:bg-teal-200 p-2 rounded-md">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
  );
}
