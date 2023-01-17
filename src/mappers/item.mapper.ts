import { Item } from '../interfaces/item.interface';

export class ItemMapper {
  toDTO(data: any): Item {
    return {
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: data.price,
        decimals: 2,
      },
      picture: data.thumbnail,
      condition: data.condition,
      free_shipping: data.shipping?.free_shipping || false,
      sold_quantity: data.sold_quantity || undefined,
      description: data.plain_text || undefined,
    };
  }
}
