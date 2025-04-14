'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Placeholder data (replace with your actual data)
const companyName = 'Acme Corp';
const productCategories = [
  {
    name: 'Category 1',
    subcategories: ['Subcategory 1.1', 'Subcategory 1.2'],
  },
  {
    name: 'Category 2',
    subcategories: ['Subcategory 2.1', 'Subcategory 2.2'],
  },
  {
    name: 'Category 3',
    subcategories: [],
  },
];
const productImages = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/id/${i + 10}/200/150`,
  alt: `Product ${i + 1}`,
}));
const companyProfile = {
  imageSrc: 'https://picsum.photos/id/20/100/100',
  description:
    'Acme Corp is a leading provider of innovative solutions.  We are committed to excellence and customer satisfaction.  Our products are designed to meet the highest standards of quality and performance. We are a global company with a presence in over 50 countries. We have a team of over 10,000 employees worldwide.  We are a publicly traded company with a market capitalization of over $10 billion.  We are a Fortune 500 company.  We are a great place to work.   We offer a competitive salary and benefits package.  We are an equal opportunity employer.  We are looking for talented and motivated individuals to join our team.  Apply today!',
};
const initialProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 30}/200/200`,
}));

const companyAdvantages = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  imageSrc: `https://picsum.photos/id/${i + 50}/300/100`,
  alt: `Advantage ${i + 1}`,
}));

const successStories = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  caseName: `Success Story ${i + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 70}/200/150`,
}));

const contactInfo = {
  title: 'Contact Us',
  description: 'Reach out to us for any inquiries.',
  email: 'info@example.com',
  phone: '+1 555-123-4567',
  address: '123 Main St, Anytown USA',
};

export default function Home() {
  const [isContactCardVisible, setIsContactCardVisible] = useState(true);

  return (
    <div className="container mx-auto p-4 relative mb-16">
      {/* Company Name */}
      <h1 className="text-2xl font-bold mb-4 text-foreground bg-secondary text-secondary-foreground p-2 rounded-md">{companyName}</h1>

      {/* Product Category */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Product Categories</h2>
        <div className="flex">
          {productCategories.map((category) => (
            <div key={category.name} className="relative group">
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-accent hover:text-accent-foreground flex items-center">
                {category.name}
                {category.subcategories && category.subcategories.length > 0 && (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </button>
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="absolute left-0 mt-2 py-2 w-48 bg-popover border border-border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {category.subcategories.map((subcategory) => (
                    <a
                      key={subcategory}
                      href="#"
                      className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {subcategory}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product Image Carousel */}
      <ProductImageCarousel images={productImages} />

      {/* Company Profile */}
      <CompanyProfile profile={companyProfile} />

      {/* Product Center */}
      <ProductCenter products={initialProducts} />

      {/* Company Advantages Carousel */}
      <CompanyAdvantages advantages={companyAdvantages} />

      {/* Success Stories Section */}
      <SuccessStories stories={successStories} />

      {/* Contact Card */}
      {isContactCardVisible && (
        <ContactCard
          contactInfo={contactInfo}
          onClose={() => setIsContactCardVisible(false)}
        />
      )}

      {/* Toggle Button */}
      {!isContactCardVisible && (
        <Button
          onClick={() => setIsContactCardVisible(true)}
          className="fixed top-1/2 transform -translate-y-1/2 right-4 z-50"
        >
          Show Contact
        </Button>
      )}

      {/* Fixed Bottom Menu */}
      <div className="fixed bottom-0 left-0 w-full p-4 flex justify-around z-30 mt-4 bg-background">
        <Link href="/" className="text-blue-500 hover:bg-blue-200 hover:text-blue-700 rounded-md px-2 py-1">Home</Link>
        <Link href="/about" className="text-blue-500 hover:bg-blue-200 hover:text-blue-700 rounded-md px-2 py-1">About</Link>
        <Link href="/products" className="text-blue-500 hover:bg-blue-200 hover:text-blue-700 rounded-md px-2 py-1">Products</Link>
        <Link href="/contact" className="text-blue-500 hover:bg-blue-200 hover:text-blue-700 rounded-md px-2 py-1">Contact</Link>
      </div>
    </div>
  );
}


function ProductImageCarousel({
  images,
}: {
  images: { id: number; src: string; alt: string }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 2; // Adjust scroll speed as needed
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 30); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-x-hidden whitespace-nowrap py-4 relative" ref={scrollRef}>
      <div className="animate-horizontal-scroll">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            width={200}
            height={150}
            className="inline-block mr-4 rounded-md shadow-md"
          />
        ))}
      </div>
    </div>
  );
}

function CompanyProfile({
  profile,
}: {
  profile: { imageSrc: string; description: string };
}) {
  const truncatedDescription =
    profile.description.length > 200
      ? profile.description.substring(0, 200) + '...'
      : profile.description;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Learn more about us</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center">
        <Image
          src={profile.imageSrc}
          alt="Company"
          width={100}
          height={100}
          className="mr-4 rounded-full"
        />
        <p className="text-sm h-24 overflow-hidden">{truncatedDescription}</p>
      </CardContent>
    </Card>
  );
}

function ProductCenter({
  products,
}: {
  products: { id: number; name: string; imageSrc: string }[];
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card >
              <Image
                src={product.imageSrc}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-md object-cover h-32 w-full"
              />
              <CardContent className="p-2">
                <CardTitle className="text-sm font-semibold">{product.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}


function CompanyAdvantages({
  advantages,
}: {
  advantages: { id: number; imageSrc: string; alt: string }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1; // Adjust scroll speed as needed
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 20); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-x-hidden whitespace-nowrap py-4 relative">
      <h2 className="text-lg font-semibold mb-2">Company Advantages</h2>
      <div className="flex space-x-4 p-4" ref={scrollRef}>
        {advantages.map((advantage) => (
          <div key={advantage.id} className="min-w-[300px]">
            <Image
              src={advantage.imageSrc}
              alt={advantage.alt}
              width={300}
              height={100}
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


function SuccessStories({
  stories,
}: {
  stories: { id: number; caseName: string; imageSrc: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stories.map((story) => (
        <Card key={story.id}>
          <Image
            src={story.imageSrc}
            alt={story.caseName}
            width={200}
            height={150}
            className="rounded-md object-cover h-32 w-full"
          />
          <CardContent className="p-2">
            <CardTitle className="text-sm font-semibold">{story.caseName}</CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ContactCard({ contactInfo, onClose }: { contactInfo: { title: string; description: string; email: string; phone: string; address: string }; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (cardRef.current) {
        const scrollHeight = cardRef.current.scrollHeight;
        const clientHeight = cardRef.current.clientHeight;

        if (scrollHeight > clientHeight) {
          cardRef.current.scrollTop = (cardRef.current.scrollTop + 1) % (scrollHeight - clientHeight + 1);
        }
      }
    };

    const intervalId = setInterval(scroll, 50); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="fixed top-1/2 transform -translate-y-1/2 right-4 w-80 z-10 overflow-hidden" style={{ height: '300px' }}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{contactInfo.title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent ref={cardRef} style={{ overflowY: 'auto', padding: '16px' }}>
        <p className="mb-2">Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
        <p className="mb-2">Phone: {contactInfo.phone}</p>
        <p>Address: {contactInfo.address}</p>
        {/* Sample QR Code Image */}
        <Image
          src="https://picsum.photos/id/800/100/100" // Replace with your QR code image URL
          alt="QR Code"
          width={100}
          height={100}
          className="mt-4 rounded-md"
        />
      </CardContent>
    </Card>
  );
}









