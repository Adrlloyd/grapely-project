import file from "./wines.json";
// console.log(file);

interface Wine {
  name: string;
  grape: string;
  color: string;
  sparkling: boolean;
  region: string;
  country: string;
  price: number;
  image_url: string;
  description: string;
  pairingOptions: string[]
}

export const newFile: Wine[] = file.map(wine => ({
  name: wine.name + ' ' + wine.year,
  grape: wine.grape ?? "",
  color: wine.wineType?.replace(/ wine/i, '') ?? "",
  sparkling: wine.wineType?.toLowerCase().includes('sparkling') || false,
  region: wine.region ?? "",
  country: wine.country ?? "",
  price: parseFloat(wine.price?.replace(/,/g, '') ?? "0"),
  image_url: wine.image ?? "",
  description: wine.description ?? "",
  pairingOptions: wine.foodPairing ?? []
}));


