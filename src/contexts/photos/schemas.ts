import {z} from 'zod'

export const photoNewFormSchema = z.object({
  title: z.string().min(1, {message: 'Campo obrigatorio'}).max(255),
  file: z.instanceof(FileList).refine(file => file.length > 0, {message: 'Precisa carregar pelo menos uma imagem'}),
  albums: z.array(z.string().uuid()).optional()
})

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>