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
    <nav className="navbar">
      <div className="navbar-content">
        <div className="user-info">
          <img src={avatarImg} alt="avatar" className="avatar" />
          <span className="username">{user?.name}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}