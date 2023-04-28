export function CreateProfile({_id, token, active, lastSync}) {
  return {
    _id: _id || '',
    token: token || '',
    active: active || false,
    lastSync: lastSync || null,
  };
}