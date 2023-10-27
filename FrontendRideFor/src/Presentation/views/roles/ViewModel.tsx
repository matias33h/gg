import React, { useState } from 'react';
import { useUserLocal } from '../../hooks/useUserLocal';

const RolesViewModel = () => {
  const { user } = useUserLocal();
  const [activeRole, setActiveRole] = useState<string | null>(null); // Estado para mantener el rol activo

  // Función para cambiar el rol activo
  const changeUserRole = (newRole: string) => {
    // Aquí puedes agregar lógica adicional si es necesario, por ejemplo, enviar una solicitud al servidor
    // Luego, actualiza el estado del rol activo
    setActiveRole(newRole);
  };

  return {
    user,
    activeRole,
    changeUserRole,
  };
};

export default RolesViewModel;
