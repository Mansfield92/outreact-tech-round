import React, { createContext, useState } from 'react';
import { StyledApp } from './App.styled';
import ActivityInput from "../components/ActivityInput";
import { Activity } from "../types/Activity";

type Theme = 'light' | 'dark';
export const ThemeContext = createContext<Theme>('dark');

const App = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [editedActivity, setEditedActivity] = useState<Activity | undefined>();

    const addActivity = (activity: Activity) => {
        setActivities((prevActivities) => {
            const newActivities = [activity, ...prevActivities]
            newActivities.sort((a, b) => b.timestamp - a.timestamp)
            return newActivities
        })
    }

    const deleteActivity = (timestamp: number) => {
        setActivities((activities) => activities.filter((activity) => activity.timestamp !== timestamp))
    }

    const editActivity = (activity: Activity) => {
        setEditedActivity(activity)
    }

    const onActivityEdit = (updateActivity: Activity) => {
        deleteActivity(updateActivity.timestamp)
        addActivity(updateActivity)
        onActivityEditCancel()
    }

    const onActivityEditCancel = () => {
        setEditedActivity(undefined)
    }

    return (
        <StyledApp>
            <ThemeContext.Provider value="dark">
                <div>
                    <ActivityInput addActivity={addActivity} editedActivity={editedActivity}
                        onActivityEditCancel={onActivityEditCancel} onActivityEdit={onActivityEdit} />
                    {activities.map((activity) => <div key={activity.timestamp}>
                        <div>{activity.type}</div>
                        <div>{activity.text}</div>
                        <button type="button" onClick={() => deleteActivity(activity.timestamp)}>Delete</button>
                        <button type="button" onClick={() => editActivity(activity)}>Edit</button>
                    </div>)}
                </div>
            </ThemeContext.Provider>
        </StyledApp>
    )
}

export default App;
