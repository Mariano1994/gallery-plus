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
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

const PhotoNewDialog = ({ trigger }: PhotoNewDialogProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema),
  });
  const { albums, isLoadingAlbums } = useAlbums();

  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  const albumsIds = form.watch("albumsIds");

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleToggleAlbum(albumId: string) {
    const albumsIds = form.getValues("albumsIds") || [];
    const albumsSet = new Set(albumsIds);

    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId);
    } else {
      albumsSet.add(albumId);
    }

    form.setValue("albumsIds", Array.from(albumsSet));
  }

  function handleSubmit(payload: PhotoNewFormSchema) {
    console.log(payload);
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adiconar nova foto</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um titulo"
              maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <Alert>
              Tamanho maximo: 50MB <br />
              Voce pode selecionar arquivos em PNG, JPG ou JPEG
            </Alert>

            <InputSingleFile
              form={form}
              allowedExtension={["png", "jpg", "jpeg"]}
              maxFileSizeInMB={50}
              repleceBy={
                <ImagePreview src={fileSource} className="w-full h-56" />
              }
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />

            <div className="flex flex-col gap-3">
              <Text variant="label-small">Selecionar albuns</Text>

              <div className="flex items-center gap-2">
                {!isLoadingAlbums &&
                  albums.length > 0 &&
                  albums.map((album) => (
                    <Button
                      key={album.id}
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      size="sm"
                      className="truncate"
                      onClick={() => handleToggleAlbum(album.id)}
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
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoNewDialog;
