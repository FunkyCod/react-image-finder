import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  ImageGalleryList,
  LoadMoreBox,
  LoadMoreWrap,
} from './ImageGallery.styled';
import FetchErrorView from '../FetchErrorView';
import Button from '../Button/';
import Loader from '../Loader/';

const ImageGalleryItem = lazy(() => import('../ImageGalleryItem'));

export default function ImageGallery({
  searchImageArray,
  error,
  status,
  totalHits,
  showLoader,
  modalFn,
  onClick,
}) {
  if (status === 'idle') {
    return (
      <div style={{ textAlign: 'center', fontSize: 'larger' }}>
        Enter <b>name</b> and input field <b>per page</b>, <br />
        to determine the number of results per page.
      </div>
    );
  }
  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <FetchErrorView message={error} />;
  }

  if (status === 'resolved') {
    return (
      <>
        <Suspense
          fallback={
            <div>
              Loading...
              <Loader />
            </div>
          }
        >
          <ImageGalleryList searchImageArray={searchImageArray}>
            {searchImageArray.map(
              ({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    modalFn={modalFn}
                  />
                );
              }
            )}
          </ImageGalleryList>

          {searchImageArray.length < totalHits && (
            <>
              <LoadMoreWrap>
                <LoadMoreBox>
                  <Button
                    type="button"
                    active={true}
                    disabled={false}
                    onClick={onClick}
                  >
                    Load More
                  </Button>
                </LoadMoreBox>{' '}
                {showLoader && <Loader />}
              </LoadMoreWrap>
            </>
          )}
        </Suspense>
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchImageArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
    })
  ),
  error: PropTypes.string,
  status: PropTypes.string.isRequired,
  totalHits: PropTypes.number,
  showLoader: PropTypes.bool.isRequired,
  modalFn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
