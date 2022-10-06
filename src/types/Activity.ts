import { ActivityType } from "../components/ActivityInput";

export type Activity = {
    timestamp: number,
    type: ActivityType,
    text: string
}
