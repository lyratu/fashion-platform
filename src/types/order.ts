export interface order {
  id: number;
  orderNumber: string;
  createTime: string;

  userId: number;

  totalAmount: number;

  payStatus: number;

  payTime: Date;

  address: string;

  contactNumber: string;

  trackingNumber: string;
  paymentType: number;
  orderItems: orderItem[];
}

export interface orderItem {
  id: number;
  orderId: number;
  goodsId: number;
  count: number;
  price: number;
  mainImage: string;
  title: string;
  goodsSpecification: string;
}
