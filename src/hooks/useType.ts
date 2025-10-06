import dataExpense from "../data/dataExpense";

export interface Type {
    id: number;
    out: string;
    emote: string;
}

const useType = () =>({data: dataExpense})

export default useType