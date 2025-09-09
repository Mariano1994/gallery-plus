import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";

const PagePhotoDetails = () => {
  const { id } = useParams();

  // Only for test Propouse
  const isLoadingPhoto = false;
  const photo = {
    id: "yrowiyr",
    title: "Ola mundo",
    imageId: "portrait-tower.png",
    albums: [
      { id: "skhfk", title: "almnut" },
      { id: "skhfkjf", title: "almnujt" },
      { id: "skjgugrhfk", title: "almnut" },
    ],
  } as Photo;

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

      <div className="grid grid-cols-[21rem] gap-24">
        <div className="space-y-3 ">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`/images/${photo.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          {!isLoadingPhoto ? (
            <Button variant="destructive">Excluir</Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>
      </div>
    </Container>
  );
};

export default PagePhotoDetails;
