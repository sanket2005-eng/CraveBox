export const testOrderData = {
  customerName: 'Test User',
  phone: '9876543210',
  address: {
    street: 'Block A, Sector 14',
    city: 'Gurgaon',
    state: 'Haryana',
    pincode: '122001',
  },
  items: [
    {
      product: 'classic-pizza',
      name: 'Classic Pizza',
      price: 100,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    },
  ],
  totalAmount: 151.75, // base + gst + fees
};

export const testOrderDataMultipleItems = {
  customerName: 'Jane Doe',
  phone: '8765432109',
  address: {
    street: 'Tower B, DLF',
    city: 'Gurgaon',
    state: 'Haryana',
    pincode: '122002',
  },
  items: [
    {
      product: 'classic-pizza',
      name: 'Classic Pizza',
      price: 170,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    },
    {
      product: 'onion-pizza',
      name: 'Onion Pizza',
      price: 190,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    },
  ],
  totalAmount: 600.5,
};

export const testCheckoutFormData = {
  fullName: 'John Doe',
  phone: '9933880173',
  houseNo: '123',
  area: 'Sector 14',
  landmark: 'Near Metro Station',
  pinCode: '122001',
  city: 'Gurgaon',
  state: 'Haryana',
};

export const testCheckoutFormDataMultiple = {
  fullName: 'Alice Johnson',
  phone: '9123456789',
  houseNo: 'Tower A',
  area: 'Golf Course Extension',
  landmark: 'Near Shopping Mall',
  pinCode: '122001',
  city: 'Gurgaon',
  state: 'Haryana',
};

export function generateRandomPhone(): string {
  const prefix = '99';
  const random = Math.floor(Math.random() * 10000000).toString().padStart(8, '0');
  return prefix + random;
}

export function generateRandomOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORD-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
