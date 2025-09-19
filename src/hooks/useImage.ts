import image from "../data/image";

export interface Sided{
    id:string,
    image:string,
    name:string

}

const useImage = () => ({data:image})

export default useImage