/**
 * Usar estos tipos de permisos en los componentes que se requieran controlar el acceso,
 * estos mismos se deben usar en la configuración de los menús en APEX, y en lo posible
 * usarlos para todos los casos, por ejemplo: un botón de asignación se puede clasificar
 * como permiso UPDATE, un botón exportar se puede clasificar como permiso READ.
 */

export enum TypePermissions {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  READ = 'READ'
}