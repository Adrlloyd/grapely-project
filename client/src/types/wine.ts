// interface for wine data
export interface Wine {
  id: string;
  name: string;
  grape?: string;
  color?: string;
  sparkling: boolean;
  region?: string;
  country?: string;
  price?: number;
  image_url?: string;
  description?: string;
  pairingOptions: string[];
  created_at: string;
  updated_at: string;
}

// interface for search results
export interface WineSearchResult {
  id: string;
  name: string;
  grape?: string;
  color?: string;
  sparkling: boolean;
  region?: string;
  country?: string;
  price?: number;
  image_url?: string;
  description?: string;
  pairingOptions: string[];
} 