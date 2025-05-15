// Define user roles with granular permissions
export enum UserRole {
  GUEST = 'guest',
  CLIENT = 'client',
  BARTENDER = 'bartender',
  MANAGER = 'manager',
  ADMIN = 'admin'
}

// Detailed permission structure
export interface Permissions {
  viewDashboard: boolean;
  manageCourses: boolean;
  manageBookings: boolean;
  manageUsers: boolean;
  accessAdminPanel: boolean;
}

// Permission mapping for each role
export const RolePermissions: Record<UserRole, Permissions> = {
  [UserRole.GUEST]: {
    viewDashboard: false,
    manageCourses: false,
    manageBookings: false,
    manageUsers: false,
    accessAdminPanel: false
  },
  [UserRole.CLIENT]: {
    viewDashboard: true,
    manageCourses: false,
    manageBookings: true,
    manageUsers: false,
    accessAdminPanel: false
  },
  [UserRole.BARTENDER]: {
    viewDashboard: true,
    manageCourses: true,
    manageBookings: true,
    manageUsers: false,
    accessAdminPanel: false
  },
  [UserRole.MANAGER]: {
    viewDashboard: true,
    manageCourses: true,
    manageBookings: true,
    manageUsers: true,
    accessAdminPanel: true
  },
  [UserRole.ADMIN]: {
    viewDashboard: true,
    manageCourses: true,
    manageBookings: true,
    manageUsers: true,
    accessAdminPanel: true
  }
};

// Permission checking utility
export const checkPermission = (
  userRole: UserRole, 
  requiredPermission: keyof Permissions
): boolean => {
  return RolePermissions[userRole][requiredPermission];
};
