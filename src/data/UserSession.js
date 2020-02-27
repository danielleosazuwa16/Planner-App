/*
    N.B.The Headers will be the date until we figure out how to switch the two
        The Goals will be the data
*/
export interface Plan {
    name: String,
    dateRange: Date[],
    data: Goal[] //the actual data to be displayed will be in Goal.planAction
}

export interface Goal {
    name: String;
    plan: PlanAction[];
    isCompleted: Boolean; 
}

export interface PlanAction {
    date: Date;
    toDo: String;
    isCompleted: Boolean;
}