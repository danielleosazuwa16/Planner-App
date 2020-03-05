import { User } from './User';
import { Plan, Goal, PlanAction } from './UserSession';

import shortid from 'shortid';

function createPlan(
    name: string,
    dateRange: Date[],
    data: Goal[]
): Plan {
    const id = shortid.generate();
    return {id, name, dateRange, data}
}

function createGoal(
    name: string,
    plan: PlanAction[],
    isCompleted: boolean
): Goal {
    const id = shortid.generate();
    return {id, name, plan, isCompleted};
}

function createPlanAction(
    date: Date,
    toDo: string,
    isCompleted: boolean
): PlanAction {
    return {date, toDo, isCompleted}
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

function createBlankPlanActions(
    dates: Date[]
): PlanAction[] {
    const arr: PlanAction[] = [];
    for (let i = 0; i < dates.length; i++ ) {
        arr.push(createPlanAction(new Date(dates[i]), "", false))
    }
    return arr;
}

const dates: Date[] = getDatesBetween(new Date(2020, 3, 2), new Date(2020, 3, 6));

const goals: Goal[] = [
    createGoal("Robot Tracker", createBlankPlanActions( dates ), false),
    createGoal("SI Individual Project", createBlankPlanActions( dates ), false),
    createGoal("SI Tech Tutorial", createBlankPlanActions( dates ), false),
    createGoal("CSC 320: General", createBlankPlanActions( dates ), false),
    createGoal("Packing", createBlankPlanActions(dates), false)
]

export const mockPlan: Plan =  createPlan("College Week 4", dates, goals)

export const mockUser: User = {'name': "Danielle Osazuwa"}