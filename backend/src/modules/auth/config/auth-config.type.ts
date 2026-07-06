import ms from 'ms';

export type AuthConfig = {
  secret?: string;
  expires?: ms.StringValue;
};

export type AuthConfigType = {
  auth: AuthConfig;
};
