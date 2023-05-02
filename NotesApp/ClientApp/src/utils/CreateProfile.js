export function CreateProfile({ id, token, isActive, lastSync }) {
  return {
      id: id || '',
      token: token || '',
      isActive: isActive || false,
      lastSync: lastSync || null,
  };
}