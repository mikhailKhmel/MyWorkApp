export function CreateProfile({Id, Token, IsActive, LastSync}) {
  return {
    id: Id || '',
    token: Token || '',
    isActive: IsActive || false,
    lastSync: LastSync || null,
  };
}