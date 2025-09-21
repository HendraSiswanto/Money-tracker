import { imageData } from "../data/imageData";

export interface Sided {
  id: string;
  imageUrl: string;
  name: string;
}

const useImage = () => ({ data: imageData });

export default useImage;
