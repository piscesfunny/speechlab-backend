const allRoles = {
  user: ['manageConversations'],
  admin: ['manageConversations', 'getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
