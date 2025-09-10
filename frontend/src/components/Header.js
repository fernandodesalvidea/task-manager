import '../styles/Header.css';

function Header({ onLogout }){
    return (
        <header>
            <h1>Your Tasks</h1>
             <button className="logout-btn" onClick={onLogout}>Logout</button>
        </header>
    );
}

export default Header;