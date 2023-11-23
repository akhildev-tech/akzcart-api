export interface TokenPayload {
  userId: string;
  deviceId: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  refreshToken: string;
}
