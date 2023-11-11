import NextImage from 'next/image';
import { ImageProps } from 'next/image';

type Props = {
  imageBuffer: Buffer;
  contentType: string;
  name: string;
} & Omit<ImageProps, 'src' | 'alt'>;

export function BufferImage({
  imageBuffer,
  contentType,
  name,
  ...rest
}: Props) {
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  const imageUrl = `data:${contentType};base64,${base64Image}`;
  return <NextImage src={imageUrl} alt={name} {...rest} />;
}
