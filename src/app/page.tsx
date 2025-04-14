'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Badge} from '@/components/ui/badge';

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
  {
    name: 'Advantages',
    subcategories: [],
  },
  {
    name: 'Success Stories',
    subcategories: [],
  },
  {
    name: 'Contact Us',
    subcategories: [],
  },
];

const products = Array.from({length: 30}, (_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  category: `Category ${Math.floor(i / 10) + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 10}/300/200`,
  description: `This is a description of Product ${i + 1}.`,
}));

const companyAdvantages = Array.from({length: 5}, (_, i) => ({
  id: i,
  imageSrc: `https://picsum.photos/id/${i + 50}/600/200`,
  description: `Advantage ${i + 1}`,
}));

const successStories = Array.from({length: 15}, (_, i) => ({
  id: i,
  caseName: `Success Story ${i + 1}`,
  imageSrc: `https://picsum.photos/id/${i + 70}/200/150`,
}));

const contactInfo = {
  title: 'Contact Us',
  qrCodeImage:
    'https://www.primefaces.org/primereact/showcase/demo/images/qr-code.png',
  phoneNumber: '123-456-7890',
  email: 'info@example.com',
  address: '123 Main St, Anytown USA',
};

const keyProducts = products.slice(0, 5);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isContactCardVisible, setIsContactCardVisible] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState<string | null>(null);

  const filteredProducts = products.filter(product => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      selectedCategory === 'All' || product.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  const toggleContactCardVisibility = () => {
    setIsContactCardVisible(!isContactCardVisible);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const isCategoryActive = (categoryName: string) => {
    return selectedCategory === categoryName;
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-secondary rounded-md shadow-md">
        <h1 className="text-2xl font-semibold">{companyName}</h1>
        <Input
          type="text"
          placeholder="Search products..."
          className="w-1/3"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => handleCategoryClick('All')}
            className={
              selectedCategory === 'All'
                ? 'bg-accent text-accent-foreground rounded-md'
                : 'rounded-md'
            }>
            All
          </MenubarTrigger>
        </MenubarMenu>
        {productCategories.map(category => (
          <MenubarMenu
            key={category.name}
            onPointerEnter={() => {
              setCurrentSubMenu(category.name);
              setIsSubMenuOpen(true);
            }}
            onPointerLeave={() => {
              setCurrentSubMenu(null);
              setIsSubMenuOpen(false);
            }}>
            <MenubarTrigger
              onClick={() => handleCategoryClick(category.name)}
              className={
                selectedCategory === category.name
                  ? 'bg-accent text-accent-foreground rounded-md'
                  : 'rounded-md'
              }>
              {category.name}
              {category.subcategories.length > 0 && (
                <Badge className="ml-2">
                  +{category.subcategories.length}
                </Badge>
              )}
            </MenubarTrigger>
            {category.subcategories.length > 0 && (
              <MenubarContent>
                {category.subcategories.map(subcategory => (
                  <MenubarItem
                    key={subcategory}
                    onClick={() => handleCategoryClick(subcategory)}>
                    {subcategory}
                  </MenubarItem>
                ))}
              </MenubarContent>
            )}
          </MenubarMenu>
        ))}
      </Menubar>

      <div style={{marginBottom: '50px'}}>
        {selectedCategory === 'All' || selectedCategory === 'Category 1' || selectedCategory === 'Category 2' || selectedCategory === 'Category 3' || selectedCategory === 'Category 4' ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Product Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex animate-horizontal-scroll">
                    {keyProducts.map(product => (
                      <Link key={product.id} href={`/product/${product.id}`}>
                        <Card className="w-64 shrink-0 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">
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
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Product List {selectedCategory !== 'All' ? `(${selectedCategory})` : '(All)'}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-5 gap-4 p-4">
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
                ) : (
                  <p>No products found in this category.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>About us</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Image
                  src="https://picsum.photos/id/222/400/200"
                  alt="Company"
                  width={400}
                  height={200}
                  className="rounded-md object-cover"
                />
                <p>
                  We are a leading provider of innovative solutions... (truncated)
                </p>
              </CardContent>
            </Card>
          </>
        ) : selectedCategory === 'Advantages' ? (
          <div className="container mx-auto p-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Advantages</CardTitle>
                <CardDescription>Our key advantages</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {companyAdvantages.map(advantage => (
                  <div key={advantage.id}>
                    <CardTitle>{advantage.description}</CardTitle>
                    <Image
                      src={advantage.imageSrc}
                      alt={advantage.description}
                      width={400}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : selectedCategory === 'Success Stories' ? (
          <div className="container mx-auto p-4">
            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>Inspiring stories of our success</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {successStories.map(story => (
                  <div key={story.id}>
                    <CardTitle>{story.caseName}</CardTitle>
                    <Image
                      src={story.imageSrc}
                      alt={story.caseName}
                      width={400}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : selectedCategory === 'Contact Us' ? (
          <div className="container mx-auto p-4">
            <Card>
              <CardHeader>
                <CardTitle>{contactInfo.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Image
                  src={contactInfo.qrCodeImage}
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <CardDescription>Phone: {contactInfo.phoneNumber}</CardDescription>
                <CardDescription>Email: {contactInfo.email}</CardDescription>
                <CardDescription>Address: {contactInfo.address}</CardDescription>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {selectedCategory === 'All' || selectedCategory === 'Advantages' ? (
          <Card>
            <CardHeader>
              <CardTitle>Company Advantages</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 p-4">
              {companyAdvantages.map(advantage => (
                <Link key={advantage.id} href={`/advantage/${advantage.id}`}>
                  <Card className="w-64 shrink-0 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground">
                    <div className="flex justify-center items-center h-32">
                      <Image
                        src={advantage.imageSrc}
                        alt={advantage.description}
                        width={200}
                        height={150}
                        className="rounded-md object-cover"
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                      />
                    </div>
                    <CardContent>
                      <CardTitle className="text-sm">{advantage.description}</CardTitle>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {selectedCategory === 'All' || selectedCategory === 'Success Stories' ? (
          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
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
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                      />
                    </div>
                    <CardContent>
                      <CardTitle className="text-sm">{story.caseName}</CardTitle>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>

      {!isContactCardVisible && (
        <button
          className="fixed top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 z-50"
          onClick={toggleContactCardVisibility}>
          Contact Us
        </button>
      )}

      <footer className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-border z-50">
        <nav className="flex justify-around">
          <Link href="/" className="hover:bg-accent hover:text-accent-foreground transition-colors p-2 rounded-md">Home</Link>
          <Link href="/products" className="hover:bg-accent hover:text-accent-foreground transition-colors p-2 rounded-md">Products</Link>
          <Link href="/about" className="hover:bg-accent hover:text-accent-foreground transition-colors p-2 rounded-md">About Us</Link>
          <Link href="/contact" className="hover:bg-accent hover:text-accent-foreground transition-colors p-2 rounded-md">Contact</Link>
        </nav>
      </footer>
    </>
  );
}

