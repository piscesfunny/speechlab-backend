const allRoles = {
  user: ['manageUploads', 'manageConversations'],
  admin: ['manageUploads', 'manageConversations', 'manageAllConversations', 'getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
