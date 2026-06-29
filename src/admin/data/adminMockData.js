export const mockProducts = [
  {
    id: 1,
    name: 'Fresh Tomato',
    category: 'Tomato',
    price: 80,
    oldPrice: 100,
    stock: 45,
    unit: 'kg',
    isOrganic: true,
    image: '🍅',
  },
  {
    id: 2,
    name: 'Red Potato',
    category: 'Potato',
    price: 60,
    oldPrice: null,
    stock: 8,
    unit: 'kg',
    isOrganic: true,
    image: '🥔',
  },
  {
    id: 3,
    name: 'White Onion',
    category: 'Onion',
    price: 50,
    oldPrice: 65,
    stock: 30,
    unit: 'kg',
    isOrganic: false,
    image: '🧅',
  },
  {
    id: 4,
    name: 'Green Cabbage',
    category: 'Cabbage',
    price: 40,
    oldPrice: null,
    stock: 5,
    unit: 'piece',
    isOrganic: true,
    image: '🥬',
  },
  {
    id: 5,
    name: 'Red Chili',
    category: 'Chili',
    price: 120,
    oldPrice: null,
    stock: 15,
    unit: 'kg',
    isOrganic: true,
    image: '🌶️',
  },
];

export const mockCategories = [
  { id: 1, name: 'Tomato', slug: 'tomato', isActive: true },
  { id: 2, name: 'Potato', slug: 'potato', isActive: true },
  { id: 3, name: 'Onion', slug: 'onion', isActive: true },
  { id: 4, name: 'Cabbage', slug: 'cabbage', isActive: true },
  { id: 5, name: 'Chili', slug: 'chili', isActive: true },
  { id: 6, name: 'Pumpkin', slug: 'pumpkin', isActive: false },
];

export const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-1001',
    customer: 'Ali Raza',
    totalAmount: 450,
    status: 'delivered',
    date: '2026-06-18',
  },
  {
    id: 2,
    orderNumber: 'ORD-1002',
    customer: 'Sara Khan',
    totalAmount: 320,
    status: 'processing',
    date: '2026-06-19',
  },
  {
    id: 3,
    orderNumber: 'ORD-1003',
    customer: 'Bilal Ahmed',
    totalAmount: 600,
    status: 'pending',
    date: '2026-06-20',
  },
  {
    id: 4,
    orderNumber: 'ORD-1004',
    customer: 'Hira Malik',
    totalAmount: 280,
    status: 'shipped',
    date: '2026-06-21',
  },
];

export const mockUsers = [
  {
    id: 1,
    name: 'Ali Raza',
    email: 'ali@example.com',
    role: 'user',
    blocked: false,
  },
  {
    id: 2,
    name: 'Sara Khan',
    email: 'sara@example.com',
    role: 'user',
    blocked: false,
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@veganfresh.com',
    role: 'admin',
    blocked: false,
  },
];

export const mockBlogs = [
  {
    id: 1,
    title: '5 Benefits of Organic Vegetables',
    author: 'Admin',
    isPublished: true,
  },
  {
    id: 2,
    title: 'How to Store Tomatoes Fresh',
    author: 'Admin',
    isPublished: false,
  },
];

export const mockCoupons = [
  {
    id: 1,
    code: 'FRESH10',
    discountType: 'percentage',
    discountValue: 10,
    isActive: true,
  },
  {
    id: 2,
    code: 'WELCOME50',
    discountType: 'fixed',
    discountValue: 50,
    isActive: true,
  },
];

export const mockWeeklySales = [
  { day: 'Mon', sales: 1200 },
  { day: 'Tue', sales: 1900 },
  { day: 'Wed', sales: 800 },
  { day: 'Thu', sales: 1600 },
  { day: 'Fri', sales: 2100 },
  { day: 'Sat', sales: 2600 },
  { day: 'Sun', sales: 1400 },
];
