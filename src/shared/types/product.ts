export interface GrowGutProduct {
  basic: {
    brand: string;
    category: string;
    discount_percentage: number;
    discounted_price: number;
    item_form: string;
    item_weight: string;
    net_quantity: string;
    price: number;
    product_name: string;
    shelf_life: string;
  };
  benefits: string[];
  composition: {
    active_ingredients: string;
    allergen_info: string;
    cfu_count: string;
    excipients: string;
    prebiotic_ingredients: string;
    probiotic_strains: string;
  };
  ingredients: Array<{
    name: string;
    type: string;
    note: string;
    image: string;
  }>;
  images: string[];
  manufacturing: {
    country_of_origin: string;
    manufacturer_address: string;
    manufacturer_name: string;
    manufacturing_license: string;
  };
  offers: {
    offers: Array<{
      code: string;
      discount_percentage: number;
      type: string;
    }>;
  };
  packaging: {
    dimensions: string;
    packaging_type: string;
    storage_instructions: string;
  };
  safety: {
    contains_preservatives: boolean;
    fssai_license: string;
    warnings: string[];
  };
  usage: {
    best_time_to_consume: string;
    daily_use_suitable: boolean;
    dosage: string;
    target_age_group: string;
  };
  is_active: boolean;
}
