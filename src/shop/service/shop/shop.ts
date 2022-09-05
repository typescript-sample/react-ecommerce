import { Attributes, Filter, Service } from 'onecore';
import { FileInfo, Thumbnail } from 'reactx-upload';
export interface Shop {
  id: string;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  type: string;
  info?: ShopInfo;
  thumbnail?: string;
  imageURL?: string;
  status: string;
  coverURL?: string;
  gallery?: FileInfo[];
  upload?: FileInfo[];
}

// filter
export interface ShopFilter extends Filter {
  id: string;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
}

export interface ShopService
  extends Service<Shop, string, ShopFilter> {
  getShopByType(type: string): Promise<Shop[]>;
  fetchImageUploaded(id: string): Promise<FileInfo[]> | FileInfo[];
  fetchThumbnailVideo(videoId: string): Promise<Thumbnail>;
}

export const shopModel: Attributes = {
  id: {
    key: true,
    required: true,
    q: true,
  },
  name: {
    required: true,
    q: true,
  },
  description: {
    required: true,
    q: true,
  },
  longitude: {
    type: 'number',
    required: true,
    q: true,
  },
  latitude: {
    type: 'number',
    required: true,
    q: true,
  },
};

export interface ShopInfo {
  viewCount: number;
  rate: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}
