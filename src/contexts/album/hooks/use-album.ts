import { toast } from "sonner";
import type { AlbumNewFormSchema } from "../schemas";
import { api } from "../../../helpers/api";
import type { Album } from "../models/album";
import { useQueryClient } from "@tanstack/react-query";
import usePhotos from "../../photos/hooks/use-photos";



export default function useAlbum() {
  const queryClient = useQueryClient()
  const {photos} = usePhotos()

  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      
      const {data: album} = await api.post<Album>(`/albums`, {
        title: payload.title
      })

      if(payload.photoIds && payload.photoIds.length > 0) {
        await Promise.all(payload.photoIds.map(photoId => {
          const photosAlbumsIds = photos
          .find(photo => photo.id === photoId)?.albums
          .map(album => album.id) || [] 


          return api.put(`/photos/${photoId}/albums`, {
            albumsIds: [...photosAlbumsIds, album.id]
          })
        }))
      }

      queryClient.invalidateQueries({queryKey: ['albums']})
      queryClient.invalidateQueries({queryKey: ['photos']})

      toast.success('Album criado com sucesso')


    } catch (error) {
      toast.error('Erro ao criar almbum')
      throw error
    }
  }

  return {createAlbum}
}