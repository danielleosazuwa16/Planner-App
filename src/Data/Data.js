import shortid from 'shortid';

export interface User {
    name: String;
    activePlans: Plan[];
    previousPlans: Plan[];
}

export interface Plan {
    id: string;
    name: string;
    headers: string[]; //our goals
    rows: Row[]; //date and todo 
}

export interface Row {
    id: string;
    date: SimpleDate;
    todos: string[];
    completed: boolean[]
}

export interface SimpleDate {
    day: Number;
    month: String;
    year: Number;
    toString: String;
}

export function createPlan(
    name: string,
    firstDate: Date,
    secondDate: Date,
    headers: string[],
){
    const id = shortid.generate();
    const dateRange = getDatesBetween(firstDate, secondDate);
    const rows = createRows(dateRange, headers.length-1)
    return {id, name, headers, rows}
}

function createRow(date: Date, numGoals: number): Row {
    const todos: string[] = [];
    const completed: boolean[] = [];
    console.log(numGoals)
    for (let i = 0; i < numGoals; i++) {
        todos.push("");
        completed.push(false);
    }
    const id = shortid.generate();
    return {id, date, todos, completed}
}

function createRows(dates: Date[], numGoals: number): Row[] {
    const rows: Row[] = [];
    let row: Row, simpleDate: SimpleDate;
    for (let i = 0; i < dates.length; i++) {
        date = createSimpleDate(dates[i]);
        row = createRow(simpleDate, numGoals);
        rows.push(row);
    }
    console.log(rows)
    return rows;
}

export function getRow(id: String, plan: Plan) {
    let i, row;
    for (i = 0; i < plan.rows.length; i++) {
        row = plan.rows[i];
        if (row.id == id) {
            break;
        }
    }
    return i;
}

export function createSimpleDate(d: Date): SimpleDate {
    let date = d.getDate(), month = d.getMonth()+1, year = d.getFullYear();
    simpleDate = {date, month, year, (month>9 ? '' : '0') + "/" (date>9 ? '' : '0') + "/" + year};
    console.log(simpleDate)
    return simpleDate;
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

export const mockSession: User = {name: "Danielle", activePlans: mockData, previousPlans: []}