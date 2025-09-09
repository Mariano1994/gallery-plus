import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Album } from "../models/album";
import cx from "classnames";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {
  albums: Album[];
  loading?: boolean;
}
const AlbumsFilter = ({
  albums,
  loading,
  className,
  ...props
}: AlbumsFilterProps) => {
  return (
    <div
      className={cx(`flex items-center gap-3 overflow-x-auto`, className)}
      {...props}
    >
      <Text variant="heading-small">Albuns</Text>

      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button variant="primary" size="sm" className="cursor-pointer">
              Todos
            </Button>

            {!loading &&
              albums.map((album) => (
                <Button
                  key={album.id}
                  variant="ghost"
                  size="sm"
                  className="cusor-pointer"
                >
                  {album.title}
                </Button>
              ))}
          </>
        ) : (
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={`loading+albums${index}`} className="h-7 w-25" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumsFilter;
