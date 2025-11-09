import { useAppSelector, useAppDispatch } from '../../hooks/useRedux'
import { logout } from '../../store/authSlice'
import { clearTasks } from '../../store/tasksSlice'
import avatarImg from '../../assets/avatar.png'
import './Navbar.css'

export const Navbar = () => {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(clearTasks())
    dispatch(logout())
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-content">
        <div className="user-info" role="region" aria-label="User information">
          <img src={avatarImg} alt={`${user?.name} avatar`} className="avatar" />
          <span className="username">{user?.name}</span>
        </div>
        <button className="logout-button" onClick={handleLogout} aria-label="Logout">
          Logout
        </button>
      </div>
    </nav>
  )
}