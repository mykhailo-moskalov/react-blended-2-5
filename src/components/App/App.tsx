import { useState } from "react";
import { getPhotos } from "../../services/photos";
import { MdError } from "react-icons/md";
import { RingLoader } from "react-spinners";
import type { IPhoto } from "../../types/photo";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";
import css from "./App.module.css";

export default function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await getPhotos(query);

      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedPhoto = (i: IPhoto | null) => {
    setSelectedPhoto(i);
  };
  return (
    <div className={css.app}>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <RingLoader size="80" color="#2a2a2a" />}
          {isError && <MdError size="80" className={css.error} />}
          {photos.length > 0 && (
            <PhotosGallery arr={photos} onClick={handleSelectedPhoto} />
          )}
          {selectedPhoto && (
            <Modal onClose={() => setSelectedPhoto(null)}>
              <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
            </Modal>
          )}
        </Container>
      </Section>
    </div>
  );
}
