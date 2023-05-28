import DropdownNotificationCard from './DropdownNotificationCard'

const DropdownNotificationRows = ({ data }) => {
    return (
        <>
            {data.map((user) => (
                <DropdownNotificationCard key={user.id} user={user} />
            ))}
        </>
    )
}

export default DropdownNotificationRows
