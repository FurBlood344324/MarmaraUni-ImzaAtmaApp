RolesPermissions = {
    "admin" : {
        "Permissions" : {
            "read" : True,
            "write" : True
        }
    },
    "user" : {
        "Permissions" : {
            "read" : True,
            "write" : False
        }
    },
}

def HasPermission(role, permission):
    return RolesPermissions[role]["Permissions"][permission]
