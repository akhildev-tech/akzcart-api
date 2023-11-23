export const loginDbQuery = `SELECT id FROM profile
WHERE email = $1 AND is_active IS TRUE AND is_deleted IS FALSE;`;
