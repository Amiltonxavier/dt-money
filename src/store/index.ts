import { Transation } from "../type";


export class Storage {
    private static key = "transition.key";

    static update(value: Transation[]) {
        try {
            const stringValue = JSON.stringify(value); 
            localStorage.setItem(this.key, stringValue);
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
        }
    }

    static save(value: Transation) {
        try {

            const existingTransactions = this.get();
            const updatedTransactions = [...existingTransactions, value];

            const stringValue = JSON.stringify(updatedTransactions); 
            localStorage.setItem(this.key, stringValue);
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
        }
    }

    static get(): Transation[]  {
        try {
            const storedValue = localStorage.getItem(this.key);
            return storedValue ? JSON.parse(storedValue) : [];
        } catch (error) {
            console.error('Erro ao recuperar do localStorage:', error);
            return [];
        }
    }
}