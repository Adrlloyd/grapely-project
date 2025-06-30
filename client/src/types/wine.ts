export interface Wine {
  id: number;
  name: string;
  grape: string;
  color: string;
  sparkling: boolean;
  region: string;
  country: string;
  price: number;
  image_url: string;
  description: string;
  pairingOptions: string[];
}

export interface WineFilterPayload {
  country: string;
  priceBracket?: {
    min: number;
    max: number;
  };
  pairing?: string;
}

export type FilteredWinesResponse =
  | { wines: Wine[]; count: number }
  | { availablePairings: string[]; overallPriceBracket: number[]; count: number };


export type FavouriteWinesResponse = {
  favourites: Wine[];
}
