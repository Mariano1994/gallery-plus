import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";

import cx from "classnames";
import useAlbums from "../hooks/use-albums";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {}
const AlbumsFilter = ({ className, ...props }: AlbumsFilterProps) => {
  const { albums, isLoadingAlbums } = useAlbums();
  return (
    <div
      className={cx(`flex items-center gap-3 overflow-x-auto`, className)}
      {...props}
    >
      <Text variant="heading-small">Albuns</Text>

      <div className="flex gap-3">
        {!isLoadingAlbums ? (
          <>
            <Button variant="primary" size="sm" className="cursor-pointer">
              Todos
            </Button>

            {!isLoadingAlbums &&
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
