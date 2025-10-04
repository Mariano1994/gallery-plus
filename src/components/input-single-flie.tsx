import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text, { textVariants } from "./text";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import FileImageIcon from "../assets/icons/image.svg?react";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";

export const InputSingleFileVariants = tv({
  base: "flex flex-col items-center justify-center w-full border border-solid border-border-primary rounded-lg group-hover:border-border-active gap-1 transition ",
  variants: {
    size: {
      md: "px-5 py-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const inputSingleFileIconVariants = tv({
  base: "fill-placeholder",
  variants: {
    size: {
      md: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputSingleFileProps
  extends VariantProps<typeof InputSingleFileVariants>,
    Omit<React.ComponentProps<"input">, "size"> {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  allowedExtension: string[];
  maxFileSizeInMB: number;
  repleceBy: React.ReactNode;
  error?: React.ReactNode;
}

const InputSingleFile = ({
  size,
  form,
  error,
  allowedExtension,
  maxFileSizeInMB,
  repleceBy,
  ...props
}: InputSingleFileProps) => {
  const formValues = useWatch({ control: form.control });
  const name = props.name || "";
  const formFile: File = useMemo(
    () => formValues[name]?.[0],
    [formValues, name]
  );

  const { fileExtention, fileSize } = useMemo(
    () => ({
      fileExtention:
        formFile?.name?.split(".")?.pop()?.toLocaleLowerCase() || "",
      fileSize: formFile?.size || 0,
    }),
    [formFile]
  );

  function isValidExtention() {
    return allowedExtension.includes(fileExtention);
  }

  function isValidSize() {
    return fileSize <= maxFileSizeInMB * 1024 * 1024;
  }

  function isValidFile() {
    return isValidExtention() && isValidSize();
  }

  return (
    <div>
      {!formFile || !isValidFile() ? (
        <>
          <div className="relative w-full group cursor-pointer">
            <input
              type="file"
              className="absolute top-0 right-0 h-full w-full opacity-0 cursor-pointer"
              {...props}
            />

            <div className={InputSingleFileVariants({ size })}>
              <Icon
                svg={UploadFileIcon}
                className={inputSingleFileIconVariants({ size })}
              />
              <Text
                variant="label-medium"
                className="text-placeholder text-center"
              >
                Arraste o arquivo para aqui <br />
                ou clique para selecionar
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            {formFile && !isValidExtention() && (
              <Text variant="label-small" className="text-accent-red">
                Tipo de aquivo invalido
              </Text>
            )}
            {formFile && !isValidSize() && (
              <Text variant="label-small" className="text-accent-red">
                Arquivo muito grande
              </Text>
            )}

            {error && (
              <Text variant="label-small" className="text-accent-red">
                {error}
              </Text>
            )}
          </div>
        </>
      ) : (
        <>
          {repleceBy}
          <div className=" flex items-center gap-3 border border-solid border-border-primary rounded-lg p-3 mt-5">
            <Icon svg={FileImageIcon} className="fill-white h-6 w-6" />
            <div className="flex flex-col ">
              <div className="truncate max-w-80">
                <Text variant="label-medium">{formFile.name}</Text>
              </div>

              <div className="flex">
                <button
                  onClick={() => form.setValue(name, undefined)}
                  type="button"
                  className={textVariants({
                    variant: "label-small",
                    className: "text-accent-red cursor-pointer hover:underline",
                  })}
                >
                  {" "}
                  Remover
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InputSingleFile;
