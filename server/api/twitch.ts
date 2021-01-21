import fetch from "node-fetch";
import { AccessTokenType, RequestHeaders } from "../types/twitch-api.type";

export const getHeaders = (clientId: string): RequestHeaders => ({
  'Client-ID': clientId,
  'Accept': `application/vnd.twitchtv.v5+json`
})

export const getAccessToken = async (clientId: string, clientSecret: string): Promise<AccessTokenType> => {
  const query = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  })

  const res: any = await fetch(`https://id.twitch.tv/oauth2/token?${query}`, { 
    method: 'POST' 
  }).then((res) => res.json())

  return res
}

export const getChannel = async (channelName: string, headers: RequestHeaders) => {
  const res = await fetch(`https://api.twitch.tv/kraken/search/channels?query=${channelName}`, { 
    headers, 
    method: 'GET' 
  }).then((res) => res.json())

  return {
    total: res?._total || 0,
    channels: res?.channels || []
  }
}

export const getChannelById = async (channelId: string, headers: RequestHeaders) => {
  const res = await fetch(`https://api.twitch.tv/kraken/channels/${channelId}`, { 
    headers, 
    method: 'GET' 
  }).then((res) => res.json())

  return res ? res : null
}