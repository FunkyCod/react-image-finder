import React from "react";
import PropTypes from "prop-types";
import {
  ImageGalleryItemBox,
  ImageGalleryItemImage,
} from "./ImageGalleryItem.styled";

function ImageGalleryItem({ webformatURL, tags, largeImageURL, modalFn }) {
  return (
    <ImageGalleryItemBox>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={(event) => {
          modalFn(event);
        }}
      />
    </ImageGalleryItemBox>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  modalFn: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
