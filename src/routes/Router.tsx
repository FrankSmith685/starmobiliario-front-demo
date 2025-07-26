/* eslint-disable react-hooks/exhaustive-deps */

import { Routes, Route, useSearchParams, Navigate } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ComponentPage from "../pages/components/ComponentPage";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useAppState } from "../hooks/useAppState";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotificacionHooks/useNotification";
import ProtectedRoute from "./ProtectedRoute";
import PanelPage from "../pages/panel/PanelPage";

const AppRouter = () => {
  const {getUserInfo} = useUser();
  const {validateResetToken}= useAuth();
  const {accessToken,setModal,setMode, setModeLogin, setAuthLoginForm,authLoginForm } = useAppState();
  const [searchParams] = useSearchParams();
  const {showMessage} = useNotification();

  // Obtener el perfil del usuari
    useEffect(() => {
      if (!accessToken) return;
      getUserInfo();
    }, [accessToken]);

    useEffect(() => {
      const token = searchParams.get("resetToken");
      if (!token) return;

      validateResetToken(token, (isValid, message) => {
        if (isValid) {
          setModal(true);
          setMode('login');
          setModeLogin('recover_three');
          setAuthLoginForm({...authLoginForm,token:token})
        } else {
          showMessage(message ?? 'Error al obtener token','error');
        }
      });
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }, []);


  return (
    // <Router>
    <div className="pt-[80px]">
        <Routes>
        {/* Rutas públicas (siempre accesibles) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/components" element={<ComponentPage />} />
        {/* <Route path="/terminos-condiciones-de-uso" element={<TerminosCondiciones />} /> */}

        {/* Rutas solo para NO autenticados */}
        {/* <Route element={<PublicRoute />}> */}
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/iniciar" element={<LoginPage />} />
          <Route path="/recuperar" element={<ForgotPage />} />
          <Route path="/actualizar-contrasena" element={<UpdatePasswordPage />} />
          <Route path="/registro" element={<RegisterPage />} /> */}
        {/* </Route> */}

        {/* Rutas protegidas (solo para autenticados) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/panel" element={<Navigate to="/panel/avisos" replace />} />
          <Route path="/panel/:option" element={<PanelPage />} />
          <Route path="/panel/:option/:suboption" element={<PanelPage />} />
        </Route>

        {/* Ruta de Admin */}
        {/* <Route element={<AdminRoute />}>
          <Route path="/panel-admin" element={<AdminPage />} />
          <Route path="/panel-admin/:option" element={<AdminPage />} />
        </Route> */}


        {/* Rutas de Servicios */}
        {/* <Route path="/servicios" element={<ServiciosPage />} /> */}

        {/* Página 404 para rutas inexistentes */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
      
    // </Router>
  );
};

export default AppRouter;
