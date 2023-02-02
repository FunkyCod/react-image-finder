import styled from "styled-components";

export const ImageGalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 15px 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
export const LoadMoreBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 10px;
  position: relative;
`;
export const LoadMoreWrap = styled.div`
display: flex;
  justify-content: center; */
`;
