import image from "../data/image";

export interface Image{
    image:object,
    name:string

}

const useImage = () => ({data:image})

export default useImage