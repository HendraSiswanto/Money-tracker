import { imageData } from "../data/imageData";

export interface Sided {
  id: number;
  imageUrl: string;
  name: string;
  clicked: boolean
}

const useImage = () => ({ data: imageData });

export default useImage;
