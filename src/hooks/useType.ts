import tipe from "../data/tipe";

export interface Type {
    id: number;
    out: string;
    emote: string;
}

const useType = () =>({data: tipe})

export default useType