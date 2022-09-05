import { FileInfo, Thumbnail } from 'reactx-upload';
import { storage } from 'uione';
import { HttpRequest } from 'web-clients';
import { Client } from 'web-clients';
import { config } from '../../../config';
import {
  Shop,
  ShopFilter,
  shopModel,
  ShopService,
} from './shop';

export * from './shop';

export class Shoplient
  extends Client<Shop, string, ShopFilter>
  implements ShopService {
  private user: string | undefined = storage.getUserId();
  constructor(http: HttpRequest, url: string) {
    super(http, url, shopModel);
    this.searchGet = true;
    this.getShopByType = this.getShopByType.bind(this);
  }

  getShopByType(type: string): Promise<Shop[]> {
    const url = this.serviceUrl + '/type/' + type;
    return this.http.get(url);
  }
  fetchImageUploaded = (id: string): Promise<FileInfo[]> | FileInfo[] => {
    if (this.user) {
      return this.http
        .get(config.shop_url + `/uploads/${id}`)
        .then((files: any) => {
          return files as FileInfo[];
        });
    }
    return [];
  }
  fetchThumbnailVideo = async (videoId: string): Promise<Thumbnail> => {
    const urlYutuServece = 'http://localhost:8081';
    return this.http
      .get(
        urlYutuServece +
        `/tube/video/${videoId}&thumbnail,standardThumbnail,mediumThumbnail,maxresThumbnail,highThumbnail`
      )
      .then((thumbnail: any) => {
        return thumbnail.data as Thumbnail;
      });
  }
}
