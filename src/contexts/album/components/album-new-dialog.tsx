import Button from "../../../components/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DaialogClose,
} from "../../../components/dialog";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import SelectCheckBoxIlustration from "../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

const AlbumNewDialog = ({ trigger }: AlbumNewDialogProps) => {
  const { photos, isLoadingPhotos } = usePhotos();

  const handleToggleSelect = (selected: boolean, photoId: string) => {
    console.log(selected, photoId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Criar Album</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um titulo" />

          <div className="space-y-3">
            <Text as="div" variant="label-small">
              Fotos Cadastradas
            </Text>

            {isLoadingPhotos && (
              <div className="flex items-center gap-2 flex-wrap">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={`photo-loading-${index}`}
                    className="h-20 w-20 rounded"
                  />
                ))}
              </div>
            )}

            {!isLoadingPhotos && photos.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {photos.map((photo) => (
                  <PhotoImageSelectable
                    key={photo.id}
                    src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                    title={photo.title}
                    imageClassName="h-20 w-20"
                    onSelectImage={(selected) =>
                      handleToggleSelect(selected, photo.id)
                    }
                  />
                ))}
              </div>
            )}

            {!isLoadingPhotos && photos.length === 0 && (
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <SelectCheckBoxIlustration />
                <Text variant="paragraph-medium" className="text-center">
                  Nenhuma foto disponivel para selecao
                </Text>
              </div>
            )}
          </div>
        </DialogBody>

        <DialogFooter>
          <DaialogClose>
            <Button variant="secondary">Cancelar</Button>
          </DaialogClose>

          <Button> Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumNewDialog;
