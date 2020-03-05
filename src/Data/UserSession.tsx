/*
    N.B.The Headers will be the date until we figure out how to switch the two
        The Goals will be the data
*/
export interface Plan {
    id: string;
    name: string,
    dateRange: Date[],
    data: Goal[] //the actual data to be displayed will be in Goal.planAction.toDo
}

export interface Goal {
    id: string;
    name: string;
    plan: PlanAction[];
    isCompleted: boolean; 
}

export interface PlanAction {
    date: Date;
    toDo: string;
    isCompleted: boolean;
}