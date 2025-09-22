import Container from "../components/container";
import AlbumsFilter from "../contexts/album/components/albums-filter";

import PhotosList from "../contexts/photos/components/photos-list";
import usePhotos from "../contexts/photos/hooks/use-photos";

const PageHome = () => {
  const { photos, isLoadingPhotos } = usePhotos();
  return (
    <Container>
      <AlbumsFilter className="mb-9" />
      <PhotosList photos={photos} loading={isLoadingPhotos} />
    </Container>
  );
};
export default PageHome;
