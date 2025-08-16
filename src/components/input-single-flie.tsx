import { tv, type VariantProps } from "tailwind-variants"
import Icon from "./icon"
import Text from "./text"
import UploadFileIcon from '../assets/icons/upload-file.svg?react'

export const InputSingleFileVariants = tv({
  base: 'flex flex-col items-center justify-center w-full border border-solid border-border-primary rounded-lg group-hover:border-border-active gap-1 transition ',
  variants: {
    size: {
      md: 'px-5 py-6'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export const inputSingleFileIconVariants = tv({
  base: 'fill-placeholder',
  variants: {
    size: {
      md: 'w-8 h-8'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})


interface InputSingleFileProps extends VariantProps<typeof InputSingleFileVariants>, React.ComponentProps<'input'>{
  
}

const InputSingleFile = ({size}:InputSingleFileProps) => {
  return(

    <div>

    <div className="relative w-full group cursor-pointer"> 
      <input type="file"  className="absolute top-0 right-0 h-full w-full opacity-0 cursor-pointer"/>

      <div className={InputSingleFileVariants({size})}>
        <Icon svg={UploadFileIcon} className={inputSingleFileIconVariants({size})}/>
        <Text variant="label-medium" className="text-placeholder text-center"> 
          Arraste o arquivo para aqui <br />
          ou clique para selecionar
        </Text>
      </div>
    </div>
    </div>
  )

}

export default InputSingleFile