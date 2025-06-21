import type { Feature } from 'geojson';

//  Represents a GeoJSON feature that has a `name` property.

export type NamedFeature = Feature & {
  properties: {
    name: string;
  };
};

//  Type-safe helper to extract the `name` property from a feature.
 
export function getFeatureName(feature: Feature): string {
  return (feature.properties as { name: string }).name;
}