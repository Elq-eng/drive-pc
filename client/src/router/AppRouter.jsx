import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { AppPage } from "../drive/pages/AppPage"

export const AppRouter = () => {
  return (
    <>
      <div className="container mt-5">
        <Routes>
              <Route path="/*" element=
              { 
                <PublicRoute>
                  <Routes>
                    <Route path="/*" element={<LoginPage />}/>
                  </Routes>
                </PublicRoute>
              }></Route>
          
          
          <Route path="/drive" element=
          {
                <PrivateRoute>
                  <AppPage />
                </PrivateRoute>
          }> </Route>
        </Routes>
      </div>


    
    </>
  )
}
