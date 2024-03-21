import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminInitiateAuthCommand,
  GetUserCommand,
  CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'

export const cognito = {
  CreateUserCommand: AdminCreateUserCommand,
  SetUserPassWordCommand: AdminSetUserPasswordCommand,
  CreateAuthCommand: AdminInitiateAuthCommand,
  GetUserCommand,
  providerClient: new CognitoIdentityProviderClient({ region: 'us-east-1' })
}
