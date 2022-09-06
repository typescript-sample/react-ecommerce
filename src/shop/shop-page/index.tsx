import Axios from "axios";
import { HttpRequest } from "axios-core";
import { useEffect, useState } from "react";
import { OnClick } from "react-hook-core";
import ReactModal from "react-modal";
import { Link, useLocation, useParams } from "react-router-dom";
import { getFileExtension, removeFileExtension, TypeFile } from "reactx-upload";
import { alert, message, options, useResource } from "uione";
import imageOnline from "../../assets/images/online.svg";
import { config } from "../../config";
import { UploadContainer } from "../../core/upload";
import { ModalSelectCover } from "../../my-profile/modal-select-cover";
import {
  Shop,
  useFollowShopResponse,
  useShopComment,
  useShopRate,
  useShopReaction,
  useShops
} from "../service";
import { Overview } from "./overview";
import { ShopPhoto } from "./photo";
import { storage } from "uione";
import { Review } from "../../review";
import "../../rate.css";
import { Products } from "./products";
import { ItemsForm } from "../../items/items-form";

// import { getFileExtension, removeFileExtension } from '../../uploads/components/UploadHook';
const httpRequest = new HttpRequest(Axios, options);

export const ShopPage = () => {
  const userId: string | undefined = storage.getUserId() || "";
  const resource = useResource();
  const { id = "" } = useParams();
  const [shop, setShop] = useState<Shop>();
  const shopService = useShops();
  const [modalUpload, setModalUpload] = useState(false);
  const [typeUpload, setTypeUpload] = useState<TypeFile>("cover");
  const [aspect, setAspect] = useState<number>(1);
  const [uploadedCover, setUploadedCover] = useState<string>();
  const [uploadedAvatar, setUploadedAvatar] = useState<string>();
  const [sizes, setSizes] = useState<number[]>([]);
  const [dropdownCover, setDropdownCover] = useState<boolean>(false);
  const [modalSelectGalleryOpen, setModalSelectGalleryOpen] = useState(false);

  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [follow, setFollow] = useState<boolean>(false);
  const followService = useFollowShopResponse();
  const rateService = useShopRate();
  const reactionService = useShopReaction();
  const commentService = useShopComment();
  const shopPath = useLocation();

  useEffect(() => {
    getShop(id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    checkFollow();
  }, []);

  useEffect(() => {
    loadFollow();
  }, [follow]);

  const loadFollow = async () => {
    const rep: any = await followService.loadfollow(id);
    if (rep) {
      setFollower(rep.followercount);
      setFollowing(rep.followingcount);
    }
  };

  const checkFollow = async () => {
    const rep = await followService.checkfollow(userId, id);
    if (rep) {
      setFollow(true);
    }
  };

  const handleFollow = async (e: any) => {
    e.preventDefault();
    if (userId) {
      if (!follow) {
        const rep = await followService.follow(userId, id);
        console.log({ rep });

        if (rep) {
          setFollow(!follow);
        }
      } else {
        const rep = await followService.unfollow(userId, id);
        if (rep) {
          setFollow(!follow);
        }
      }
    }
  };
  const getShop = async (id: string) => {
    const currentShop = await shopService.load(id);
    if (currentShop) {
      setShop(currentShop);
      setUploadedCover(currentShop?.coverURL);
      setUploadedAvatar(currentShop?.imageURL);
    }
  };
  if (!shop) {
    return <div></div>;
  }

  const openModalUpload = (e: OnClick, type: TypeFile) => {
    e.preventDefault();
    setModalUpload(true);
    setTypeUpload(type);
    if (type === "cover") {
      setAspect(2.7);
      setSizes([576, 768]);
    } else {
      setAspect(1);
    }
    setSizes([40, 400]);
  };

  const handleChangeFile = (fi: string | undefined) => {
    if (typeUpload === "cover") {
      setUploadedCover(fi);
    } else {
      setUploadedAvatar(fi);
    }
  };

  const closeModalUpload = (e: OnClick) => {
    e.preventDefault();
    setModalUpload(false);
  };
  const toggleDropdownCover = (e: OnClick) => {
    e.preventDefault();
    setDropdownCover(!dropdownCover);
  };
  const toggleSelectGallery = (e: OnClick) => {
    e.preventDefault();
    setModalSelectGalleryOpen(!modalSelectGalleryOpen);
  };

  const saveImageCover = (e: OnClick, url: string) => {
    e.preventDefault();
    setShop({ ...shop, coverURL: url });
    setUploadedCover(url);
    shopService.update({ ...shop, coverURL: url }).then((successs) => {
      if (successs) {
        message(resource.success_save_my_profile);
      } else {
        alert(resource.fail_save_my_profile, resource.error);
      }
    });
  };

  const getImageBySize = (url: string | undefined, size: number): string => {
    if (!url) {
      return "";
    }
    return removeFileExtension(url) + `_${size}.` + getFileExtension(url);
  };

  console.log({ uploadedAvatar });

  return (
    <div className="profile view-container">
      <form id="locationForm" name="locationForm">
        <header className="border-bottom-highlight">
          <div className="cover-image">
            {(uploadedCover && <img alt="" src={uploadedCover} />) || (
              <img
                alt=""
                src="https://pre00.deviantart.net/6ecb/th/pre/f/2013/086/3/d/facebook_cover_1_by_alphacid-d5zfrww.jpg"
              />
            )}
            <div className="contact-group">
              <button id="btnPhone" name="btnPhone" className="btn-phone" />
              <button id="btnEmail" name="btnEmail" className="btn-email" />
            </div>
            <button id="btnFollow" name="btnFollow" onClick={(e) => handleFollow(e)} className="btn-follow">
              {follow ? "UnFollow" : "Follow"}
            </button>
          </div>
          <button id="btnCamera" name="btnCamera" className="btn-camera" onClick={toggleDropdownCover} />
          <ul
            id="dropdown-basic"
            className={`dropdown-content-profile dropdown-upload-cover ${dropdownCover ? "show-upload-cover" : ""}`}
          >
            <li className="menu" onClick={(e) => openModalUpload(e, "cover")}>
              Upload
            </li>
            <hr style={{ margin: 0 }} />
            <li className="menu" onClick={toggleSelectGallery}>
              Choose from gallery
            </li>
          </ul>
          <div className="avatar-wrapper">
            <img
              alt=""
              className="avatar"
              src={uploadedAvatar ? getImageBySize(uploadedAvatar, 400) :
                "https://www.bluebridgewindowcleaning.co.uk/wp-content/uploads/2016/04/default-avatar.png"
              }
            />
            <button
              id="btnCamera"
              name="btnCamera"
              className="btn-camera"
              onClick={(e) => openModalUpload(e, "upload")}
            />
            <img className="profile-status" alt="status" src={imageOnline} />
          </div>
          <div className="profile-title">
            <h3>{shop.name}</h3>
            <p>{shop.description}</p>
            <p>{follower} followers</p>
          </div>
          {/*
              <div className='card'>
                <h3>{location.locationName}</h3>
                <p>{location.description}</p>
              </div>*/}
          <nav className="menu">
            <ul>
              <li>
                <Link to={`/shops/${id}`}> Overview </Link>
              </li>
              <li>
                <Link to={`/shops/${id}/products`}> Products </Link>
              </li>
              <li>
                <Link to={`/shops/${id}/review`}> Review </Link>
              </li>
              {/* <li>
                <Link to={`/shops/${id}/photo`}> Photo </Link>
              </li> */}
              <li>
                <Link to={`/shops/${id}/about`}> About </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="row">
          <Overview />
          {shopPath.pathname.includes("products") ? <ItemsForm shop={shop} /> : null}

          <Review
            i={shop}
            get={getShop}
            id={id}
            userId={userId}
            rateRange={5}
            rateService={rateService}
            reactionService={reactionService}
            commentService={commentService}
          />
          {/* <ShopPhoto /> */}
        </div>
      </form>
      <ReactModal
        isOpen={modalUpload}
        onRequestClose={closeModalUpload}
        contentLabel="Modal"
        // portalClassName='modal-portal'
        className="modal-portal-content"
        bodyOpenClassName="modal-portal-open"
        overlayClassName="modal-portal-backdrop"
      >
        <div className="view-container profile-info">
          <form model-name="data">
            <header>
              <h2>{resource.title_modal_uploads}</h2>
              <button type="button" id="btnClose" name="btnClose" className="btn-close" onClick={closeModalUpload} />
            </header>
            <UploadContainer
              post={httpRequest.post}
              setURL={(dt: any) => handleChangeFile(dt)}
              type={typeUpload}
              id={shop.id}
              url={config.shop_url}
              aspect={aspect}
              sizes={sizes}
            />
            <footer>
              <button type="button" id="btnSave" name="btnSave" onClick={closeModalUpload}>
                {resource.button_modal_ok}
              </button>
            </footer>
          </form>
        </div>
      </ReactModal>
      <ModalSelectCover
        list={shop.gallery ?? []}
        modalSelectGalleryOpen={modalSelectGalleryOpen}
        closeModalUploadGallery={toggleSelectGallery}
        setImageCover={saveImageCover}
      />
    </div>
  );
};
