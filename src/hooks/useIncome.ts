import dataIncome from "../data/dataIncome";

export interface TypeIncome {
    id: number;
    in: string;
    emote: string;
}

const useType = () =>({data: dataIncome})

export default useType