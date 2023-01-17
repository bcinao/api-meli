import fetch from 'node-fetch';

interface IItemsService {
  getItems(query: string): Promise<any>;
  getItem(id: string): Promise<any>;
}

export class ItemsService implements IItemsService {
  constructor() {}

  async getItems(search: string): Promise<any> {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${search}&limit=4`);

    if (response.status !== 200) {
      throw new Error('No se encontró el endpoint');
    }

    return await response.json();
  }

  async getItem(id: string): Promise<any> {

    const [resItem, resDescription] = await Promise.all([
      fetch(`https://api.mercadolibre.com/items/${id}`),
      fetch(`https://api.mercadolibre.com/items/${id}/description`)
    ]);

    if (resItem.status !== 200 || resDescription.status !== 200) {
      throw new Error('Ocurrio un problema al obtener la información del item');
    }

    const jsonItem = await resItem.json();
    const jsonDescription = await resDescription.json();

    return [jsonItem, jsonDescription];
  }

  /**
   * Se obtienen el arbol de categorias con mayor cantidad de items
   *
   * @param results Array
   * @returns
   */
  async getCategoriesWithMaxResult(results: any): Promise<String[]> {
    const categories: any = {};
    const iterated: any = {};

    if (results.length === 0) {
      return [];
    }

    for (const result of results) {
      if (!iterated[result.category_id]) {
        iterated[result.category_id] = true;

        const response = await fetch(`https://api.mercadolibre.com/categories/${result.category_id}`);
        const json = await response.json();

        categories[json.total_items_in_this_category] = json.path_from_root;
      }
    }

    const max = Math.max(...(Object.keys(categories) as []));

    return categories[max]?.map((category: any) => category.name);
  }
}
