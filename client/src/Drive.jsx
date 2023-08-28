import { AuthProvider } from './auth/context/AuthProvider.jsx'
import { AppRouter } from './router/AppRouter.jsx'


export const Drive = () => {
  
  
  return (
    <AuthProvider>
        <AppRouter/>
    </AuthProvider>
  )
}
