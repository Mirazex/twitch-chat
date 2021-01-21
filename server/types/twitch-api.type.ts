export type AccessTokenType = {
  access_token: string;
  expires_in: number;
  token_type: string
}

export type RequestHeaders = {
  'Client-ID': string,
  'Accept': string
}