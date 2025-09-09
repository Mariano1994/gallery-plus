import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";

interface PhotosListProps {
  photos: Photo[];
  loading?: boolean;
}

const PhotosList = ({ photos, loading }: PhotosListProps) => {
  return (
    <div className="space-y-6">
      <Text
        variant="paragraph-large"
        className="flex items-center justify-end gap-1 text-accent-span"
      >
        Total de fotos:{" "}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )}
      </Text>
      <div className="grid grid-cols-4 gap-9 ">
        {!loading &&
          photos.length > 0 &&
          photos.map((photo) => (
            <PhotoWidget photo={photo} key={photo.id} loading={loading} />
          ))}

        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <PhotoWidget
              photo={{} as Photo}
              key={`photo-loading-${index}`}
              loading={loading}
            />
          ))}
      </div>
      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
        </div>
      )}
    </div>
  );
};

export default PhotosList;
