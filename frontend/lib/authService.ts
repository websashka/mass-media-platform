import Moralis from 'moralis';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const config = {
  SUPABASE_URL: "https://cbluufxienoloamrwmjb.supabase.co",
  SUPABASE_SERVICE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNibHV1ZnhpZW5vbG9hbXJ3bWpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDAyMTE0NCwiZXhwIjoyMDA1NTk3MTQ0fQ.4GEJUI4yLzcLz7Wac97UdmAEr0VkY9jzZIwh8oxitVw",
  SUPABASE_JWT: "2b5p8q6ABv744/nmWNxwqRytzcWibrToWDVkwwB4vlOOxhqDv76aLLDqy1cmv/PTQ30KnbMnQFpZ2EuzQN6XOw=="
}

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

export interface RequestMessage {
  address: string;
  chain: string;
  networkType: string;
}

const STATEMENT = 'Please sign this message to confirm your identity.';
const EXPIRATION_TIME = 900000;
const TIMEOUT = 15;

export async function requestMessage({
 address,
 chain,
 networkType,
}: {
  address: string;
  chain: string;
  networkType: 'evm';
}) {
  const url = new URL(config.SUPABASE_URL);
  const now = new Date();
  const expirationTime = new Date(now.getTime() + EXPIRATION_TIME);

  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    networkType,
    domain: url.hostname,
    statement: STATEMENT,
    uri: url.toString(),
    notBefore: now.toISOString(),
    expirationTime: expirationTime.toISOString(),
    timeout: TIMEOUT,
  });

  const { message } = result.toJSON();

  return message;
}

export interface VerifyMessage {
  networkType: 'evm';
  signature: string;
  message: string;
}

export async function verifyMessage({ networkType, signature, message }: VerifyMessage) {
  const result = await Moralis.Auth.verify({
    networkType,
    signature,
    message,
  });

  const authData = result.toJSON();

  let { data: user } = await supabase.from('users').select('*').eq('moralis_provider_id', authData.profileId).single();

  if (!user) {
    const response = await supabase
      .from('users')
      .insert({ moralis_provider_id: authData.profileId, metadata: authData })
      .single();
    user = response.data;
  }

  const token = jwt.sign(
    {
      ...user,
      aud: 'authenticated',
      role: 'authenticated',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    config.SUPABASE_JWT,
  );

  return { user, token };
}