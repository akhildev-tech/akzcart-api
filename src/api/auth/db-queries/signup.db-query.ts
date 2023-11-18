export const signupDbQuery = `INSERT
INTO profile (auth_id, name, nick_name, email)
VALUES($1, $2, $3, $4);`;
