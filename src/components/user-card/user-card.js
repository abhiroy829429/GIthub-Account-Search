import './user-card.css'

export default function UserCard (props) {
    return (
        <a
            href={props.accountLink}
            target="_blank"
            rel="noopener noreferrer"
            className="user-card user-card-link"
            tabIndex={0}
            aria-label={`Open GitHub profile for ${props.username}`}
        >
            <img 
                src={props.profileLink} 
                alt={`Avatar of ${props.username}`}
                className="avatar"
                width="64"
                height="64"
            />
            <span className="username-link">{props.username}</span>
            {props.userType && <div className="user-type">{props.userType}</div>}
        </a>
    )
}