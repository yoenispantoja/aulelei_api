export const RoleEnum = {
    Administrador: 'AdministradorProfile',
    Cajero: 'CajeroProfile',
    Estilista: 'EstilistaProfile',
    Cliente: 'ClienteProfile'
};

export const getRoles = () => Object.values(RoleEnum);