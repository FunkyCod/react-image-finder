import React, { useState, useEffect, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "../theme/GlobalStyle.styled";

import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Searchbar from "../components/Searchbar";

import axiosPixabayIPI from "../services/axiosPixabayIPI";

import useAxiosFunction from "../hooks/useAxiosFunction";


const ImageGallery = lazy(() => import("../components/ImageGallery"));

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [searchImageArray, setSearchImageArray] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [totalPages, setTotalPages] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { result, errorFetch, axiosFetch } = useAxiosFunction();

  const getData = async () => {
    setShowLoader(true);
    try {
      await axiosFetch({
        axiosInstance: axiosPixabayIPI,
        method: "GET",
        url: "/",

        requestConfig: {
          timeout: 5000, 
          params: {
            key: process.env.REACT_APP_PIXABAY_API_KEY,
            q: `${searchQuery}`,
            page: `${page}`,
            image_type: "photo",
            orientation: "horizontal",
            per_page: `${perPage}`,
            safesearch: true,
          },
        },
      });
      setStatus("resolved");
      setError(null);
    } catch (error) {
      setStatus("rejected");
      setError(errorFetch);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const startFetch = async () => {
      if (searchQuery !== "") {
        await setSearchImageArray([]);
        await getData();
      }
    };
    startFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, perPage]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      window.scrollBy({
        top: 550,
        behavior: "smooth",
      });
      if (searchImageArray.length >= totalHits) {
        toast.info(
          `Сожалеем, но вы достигли конца списка \n результатов поиска по ${searchQuery}.`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchImageArray]);

  useEffect(() => {
    const updateFetch = async () => {
      try {
        if (searchQuery !== "") {
          await setSearchImageArray((prev) =>
            page !== 1 ? [...prev, ...result.hits] : result.hits
          );
          await setTotalPages(Math.ceil(result.totalHits / perPage));
          await setTotalHits(result.totalHits);
        }
        if (result.hits.length === 0) {
          setStatus("rejected");
        }
      } catch (error) {}
    };
    updateFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, perPage]);

  const handleSearchBarSubmit = async (event) => {
    await event.preventDefault();
    await setSearchQuery(event.target.searchQuery.value);
    if (event.target.searchQuery.value === "") {
      return toast.info("Введите имя");
    }
    setPage(1);
    event.target.reset();
  };

  const handleSelect = (event) => {
    setPerPage(event.value);
  };

  
  const handleLoadMoreButton = async () => {
    await setPage((prevState) => prevState + 1);
  };
 
  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };
  const openLargeImage = (event) => {
    if (event.target.nodeName !== "IMG") {
      return;
    }
    setModalImage(event.target.dataset.source);
    toggleModal();
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <GlobalStyle />
      <Suspense
        fallback={
          <div>
            Loading...
            <Loader />
          </div>
        }
      >
        <Searchbar
          onSubmit={handleSearchBarSubmit}
          onChangeSelect={handleSelect}
          totalPages={totalPages}
          page={page}
          searchImageArray={searchImageArray}
        />
        <ImageGallery
          searchQuery={searchQuery}
          searchImageArray={searchImageArray}
          error={error}
          status={status}
          totalHits={totalHits}
          showLoader={showLoader}
          onClick={handleLoadMoreButton}
          modalFn={openLargeImage}
        />
      
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <img src={modalImage} alt={"modal"} />
          </Modal>
        )}
       
      </Suspense>
    </>
  );
}
