import { useLogin } from '../../hooks/useLogin'
import { Modal } from '../atomic/Modal'
import { Input } from '../atomic/Input'
import { Loader } from '../atomic/Loader'

export const UnauthedView = () => {
  const { formData, errors, isLoading, updateField, login } = useLogin()

  const handleSubmit = async () => {
    await login()
  }

  return (
    <div className="app">
      <Modal 
        title="Login" 
        onSubmit={handleSubmit}
        submitLabel={isLoading ? <Loader /> : 'Login'}
        showOverlay={false}
      >
        <Input
          placeholder="Id"
          value={formData.userId}
          onChange={(value) => updateField('userId', value)}
          error={errors.userId}
          ariaLabel="User ID"
        />
        <Input
          placeholder="Name"
          value={formData.userName}
          onChange={(value) => updateField('userName', value)}
          error={errors.userName}
          ariaLabel="User Name"
        />
      </Modal>
    </div>
  )
}