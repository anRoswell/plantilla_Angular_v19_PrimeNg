export interface IGeojson<T> {
    type: string;
    features?: IFeature<T>[];
}

export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IFeature<T> {
    type: string;
    geometry?: IGeometry;
    properties: T;
}