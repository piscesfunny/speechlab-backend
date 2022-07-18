const allRoles = {
  user: ['manageUploads', 'manageConversations'],
  admin: ['manageUploads', 'manageConversations', 'getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
