export interface Role {
    id: number;
    name: string;
    type: RoleType;
    accessibleToExternalUsers: boolean;
    roleAccessRights: RoleAccessRight[];
}

export interface RoleAccessRight {
    roleId: number;
    accessRightId: number;
    role: Role;
    accessRight: AccessRight;
}

export interface AccessRight {
    id: number;
    accessRightCategoryId: number;
    name: string;
    roleType: RoleType;
    accessRightCategory: AccessRightCategory[];
    roleAccessRights: RoleAccessRight[];
}

export interface AccessRightCategory {
    id: number;
    name: string;
    accessRights: AccessRight[];
}

export enum RoleType {
    Admin = 'admin',
    Local = 'local',
}