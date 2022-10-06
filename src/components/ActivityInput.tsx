import React, { ChangeEvent, useEffect, useState } from 'react';
import { Activity } from "../types/Activity";

export enum ActivityType {
    MESSAGE = 'MESSAGE',
    CALL = 'CALL'
}

const activities: Array<{ icon: string, type: ActivityType }> = [
    { icon: 'message', type: ActivityType.MESSAGE },
    { icon: 'call', type: ActivityType.CALL },
]

type ActivityInputProps = {
    editedActivity?: Activity
    onActivityEditCancel: () => void
    addActivity: (activity: Activity) => void
    onActivityEdit: (activity: Activity) => void
}

const ActivityInput = ({ editedActivity, addActivity, onActivityEditCancel, onActivityEdit }: ActivityInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [activityType, setActivityType] = useState<ActivityType>(editedActivity?.type ?? ActivityType.MESSAGE);

    useEffect(() => {
        if (editedActivity) {
            setInputValue(editedActivity.text)
            setActivityType(editedActivity.type)
        } else {
            onFormReset()
        }
    }, [editedActivity])

    const onFormReset = () => {
        setInputValue('')
        setActivityType(ActivityType.MESSAGE)
    }

    const onSubmit = (e: any) => {
        e.preventDefault()

        if (!inputValue) {
            alert('Activity failed to create, activity note is mandatory.')
            return
        }

        if (editedActivity) {
            onActivityEdit({ type: activityType, text: inputValue, timestamp: editedActivity.timestamp })
        } else {
            addActivity({ type: activityType, text: inputValue, timestamp: Date.now() })
        }

        // Resetting form after submitting
        onFormReset()
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea value={inputValue} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setInputValue(e.target.value)
            }} placeholder="Add a note about Milton Romaguera..." />
            <div>
                {activities.map((activity) => (
                    <div onClick={() => setActivityType(activity.type)} key={activity.type}
                        className={activityType === activity.type ? 'active' : undefined}>
                        {activity.icon}<br />
                        {activity.type} {activityType === activity.type ? '(active)' : undefined}
                    </div>
                ))}
                {editedActivity && <button type="button" onClick={() => {
                    onFormReset()
                    onActivityEditCancel()
                }}>Cancel</button>}
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default ActivityInput;
