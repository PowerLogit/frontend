import DropdownNotificationCard from './DropdownNotificationCard'

const DropdownNotificationRows = ({ data, onSuccess, handlers }) => {
    return (
        <>
            {data.map((user) => (
                <DropdownNotificationCard
                    key={user.id}
                    user={user}
                    onSuccess={onSuccess}
                    handlers={handlers}
                />
            ))}
        </>
    )
}

export default DropdownNotificationRows
