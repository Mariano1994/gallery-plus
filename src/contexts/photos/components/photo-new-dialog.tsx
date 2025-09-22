import {
  DaialogClose,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-flie";
import ImagePreview from "../../../components/image-preview";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import useAlbums from "../../album/hooks/use-albums";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

const PhotoNewDialog = ({ trigger }: PhotoNewDialogProps) => {
  const form = useForm();
  const { albums, isLoadingAlbums } = useAlbums();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adiconar nova foto</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um titulo" maxLength={255} />
          <Alert>
            Tamanho maximo: 50MB <br />
            Voce pode selecionar arquivos em PNG, JPG ou JPEG
          </Alert>

          <InputSingleFile
            form={form}
            allowedExtension={["png", "jpg", "jpeg"]}
            maxFileSizeInMB={50}
            repleceBy={<ImagePreview className="w-full h-56" />}
          />

          <div className="flex flex-col gap-3">
            <Text variant="label-small">Selecionar albuns</Text>

            <div className="flex items-center gap-2">
              {!isLoadingAlbums &&
                albums.length > 0 &&
                albums.map((album) => (
                  <Button
                    key={album.id}
                    variant="ghost"
                    size="sm"
                    className="truncate"
                  >
                    {album.title}
                  </Button>
                ))}

              {isLoadingAlbums &&
                Array.from({ length: 4 }).map((__, index) => (
                  <Skeleton
                    key={`albums-list-index${index}`}
                    className="h-7 w-20"
                  />
                ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DaialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DaialogClose>
          <Button>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoNewDialog;
