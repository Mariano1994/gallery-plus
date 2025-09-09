import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";

const PagePhotoDetails = () => {
  const { id } = useParams();

  // Only for test Propouse
  const isLoadingPhoto = false;
  const photo = {} as Photo;

  return (
    <Container>
      <header className=" flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large">{photo.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator />
      </header>
    </Container>
  );
};

export default PagePhotoDetails;
