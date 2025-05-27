// types/admin.ts
export interface Product {
  ID_Product: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  categoryId: number;
  Category: {
    Name_categry: string;
  };
  ProductItems: {
    Size: {
      Size_name: string;
    } | null;
    Price: number;
  }[];
}

export interface Order {
  id: number;
  createdAt: string;
  address: string;
  items: any[];
  totalAmount: number;
  status: 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
  points: number;
  user: {
    Name_user: string;
    Email_user: string;
  };
}
