import axios from "axios";
import { HttpRequest } from "axios-core";
import { useState } from "react";
import { options, storage } from "uione";
import { FollowClient, FollowService } from "./follow";
import { Shoplient } from "./shop";
import { ShopService } from "./shop/shop";
import { SavedItemClient, SavedItemService } from "./saved-location";
import { CommentClient, CommentService, RateClient, RateService, ReactionClient, ReactionService } from "../../review";

export * from "./shop";

const httpRequest = new HttpRequest(axios, options);
export interface Config {
  location_url: string;
  saved_location: string;
  location_follow_url: string;
  location_rate_url: string;

}
class ApplicationContext {
  shopService?: ShopService;
  savedItemService?: SavedItemService;
  followService?: FollowService;
  rateService?: RateService;
  reactionService?: ReactionService;
  commentService?: CommentService;

  constructor() {
    this.getConfig = this.getConfig.bind(this);
    this.getShopService = this.getShopService.bind(this);
  }

  getConfig(): Config {
    return storage.config();
  }

  getFollowService(): FollowService {
    if (!this.followService) {
      const c = this.getConfig();
      this.followService = new FollowClient(httpRequest, c.location_follow_url);
    }
    return this.followService;
  }

  getSavedItemService(): SavedItemService {
    if (!this.savedItemService) {
      const c = this.getConfig();
      this.savedItemService = new SavedItemClient(httpRequest, c.saved_location);
    }
    return this.savedItemService;
  }

  getShopService(): ShopService {
    if (!this.shopService) {
      const c = this.getConfig();
      this.shopService = new Shoplient(httpRequest, c.location_url);
    }
    return this.shopService;
  }

  getLocationRateService(): RateService {
    if (!this.rateService) {
      const c = this.getConfig();
      this.rateService = new RateClient(httpRequest, c.location_rate_url);
    }
    return this.rateService;
  }

  getLocationReactionService(): ReactionService {
    if (!this.reactionService) {
      const c = this.getConfig();
      this.reactionService = new ReactionClient(httpRequest, c.location_rate_url);
    }
    return this.reactionService;
  }

  getLocationCommentService(): CommentService {
    if (!this.commentService) {
      const c = this.getConfig();
      this.commentService = new CommentClient(httpRequest, c.location_rate_url);
    }
    return this.commentService;
  }
}

export const context = new ApplicationContext();

export function useShopsService(): ShopService {
  const [service] = useState(() => context.getShopService());
  return service;
}

export function useLocations(): ShopService {
  return context.getShopService();
}

export function useSavedItemResponse(): SavedItemService {
  return context.getSavedItemService();
}

export function useFollowLocationResponse(): FollowService {
  return context.getFollowService();
}

export function useLocationRate(): RateService {
  return context.getLocationRateService();
}

export function useLocationReaction(): ReactionService {
  return context.getLocationReactionService();
}

export function useLocationComment(): CommentService {
  return context.getLocationCommentService();
}