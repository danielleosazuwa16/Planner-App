import User from './User';
import Plan from './UserSession';

function createPlan(
    name: String,
    dateRange: Date[],
    data: Goal[]
): Plan {
    return {name, dateRange, data}
}

function createGoal(
    name: String,
    plan: PlanAction[],
    isCompleted: Boolean
): Goal {
    return {name, plan, isCompleted};
}

function createPlanAction(
    date: Date,
    toDo: String,
    isCompleted: Boolean
): PlanAction {
    return {data, toDo, isCompleted}
}

function getDatesBetween(
    firstDate: Date,
    secondDate: Date
): Date[] {
    for (const arr: Date[], i = firstDate; i <= secondDate; i.setDate(i.getDate() + 1)) {
        arr.push(new Date(i));
    } 
    return arr;
}

function createBlankPlanActions(
    dates: Date[]
): Plan[] {
    for (const arr: Plan[], i = 0; i < dates.length; i++ ) {
        arr.push(createPlanAction(new Date(dates[i]), "", false))
    }
    return arr;
}

const dates: Date[] = getDatesBetween(new Date(2020, 03, 02), new Date(2020, 03, 06));

const goals: Goals[] {
    createGoal("Robot Tracker", createBlankPlanActions( dates ), false),
    createGoal("SI Individual Project", createBlankPlanActions( dates ), false),
    createGoal("SI Tech Tutorial", createBlankPlanActions( dates ), false),
    createGoal("CSC 320: General", createBlankPlanActions( dates ), false),
    createGoal("Packing", createBlankPlanActions(dates), false);
}

export const mockPlan: Plan {
    createPlan("College Week 4", dates, goals);
}

export const mockUser: User = {
    'name': "Danielle Osazuwa";
}