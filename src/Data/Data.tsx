import shortid from 'shortid';

export interface User {
    name: String;
    activePlans: Plan[];
    previousPlans: Plan[];
}

export interface Plan {
    id: string;
    name: string;
    dateRange: Date[];
    headers: string[]; //our goals
    rows: Row[]; //date and todo 
}

export interface Row {
    id: string;
    date: Date;
    todos: string[];
    completed: boolean[]
}

export function createPlan(
    name: string,
    firstDate: Date,
    secondDate: Date,
    headers: string[],
){
    const id = shortid.generate();
    const dateRange = getDatesBetween(firstDate, secondDate);
    const rows = getRows(dateRange, headers.length)
    return {id, name, dateRange, headers, rows}
}

function createRow(date: Date, numGoals: number): Row {
    const todos: string[] = [];
    const completed: boolean[] = [];
    for (let i = 0; i < numGoals; i++) {
        todos.push("");
        completed.push(false);
    }
    const id = shortid.generate();
    return {id, date, todos, completed}
}

function getRows(dates: Date[], numGoals: number): Row[] {
    const rows: Row[] = [];
    let row: Row
    for (let i = 0; i < dates.length; i++) {
        row = createRow(dates[i], numGoals)
        rows.push(row)
    }
    console.log(rows)
    return rows;
}

function getDatesBetween(
    firstDate: Date,
    secondDate: Date
): Date[] {
    const arr: Date[] = [];
    for (let i = firstDate; i <= secondDate; i.setDate(i.getDate() + 1)) {
        arr.push(new Date(i));
    } 
    
    return arr;
}

const headers: string[] = ["Date", "Robot Tracker", "SI Individual Project", "Learn Hooks", "CSC 320", "Packing"];

export const mockData: Plan = createPlan("College Week 4", new Date(2020, 3, 2), new Date(2020, 3, 6), headers);