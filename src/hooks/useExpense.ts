import dataExpense from "../data/dataExpense";


export interface TypeExpense {
    id: number;
    out: string;
    emote: string;
}

const useType = () =>({data: dataExpense})

export default useType