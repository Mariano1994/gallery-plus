import { Link } from "react-router";
import Badge from "../../../components/badge";
import ImagePreview from "../../../components/image-preview";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../models/photo";
import { buttonVariants } from "../../../components/button";

interface PhotoWidgetProps {
  photo: Photo;
  loading?: boolean;
}

const PhotoWidget = ({ photo, loading }: PhotoWidgetProps) => {
  return (
    <div className="flex flex-col gap-4">
      {!loading ? (
        <ImagePreview
          src={`/images/${photo.imageId}`}
          title={photo.title}
          className="w-[13.5625rem] h-[13.5625rem] rounded-lg"
        />
      ) : (
        <Skeleton className="w-[13.5625rem] h-[13.5625rem] rounded-lg" />
      )}

      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text variant="paragraph-large" className="truncate">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="w-full h-8" />
        )}

        <div className="flex gap-1 main-h-[1.375rem">
          {!loading ? (
            <>
              {photo.albums.slice(0, 2).map((album) => (
                <Badge className="truncete" size="xs" key={album.id}>
                  {album.title}
                </Badge>
              ))}

              {photo.albums.length > 2 && (
                <Badge size="xs"> +{photo.albums.length - 2}</Badge>
              )}
            </>
          ) : (
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={`album-loading-${index}`}
                className="w-full h-4 rounded-sm"
              />
            ))
          )}
        </div>
      </div>

      {!loading ? (
        <Link
          to={`/photos/${photo.id}`}
          className={buttonVariants({
            variant: "secondary",
            className: "px-2 py-2",
          })}
        >
          <Text>Detalhes da imagem</Text>
        </Link>
      ) : (
        <Skeleton className="w-full h-10" />
      )}
    </div>
  );
};

export default PhotoWidget;
