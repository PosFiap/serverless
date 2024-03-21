import { sendResponse } from '../utils/sendResponse.mjs'
import { USER_POOL } from '../const/paths.mjs'
import { cognito } from '../const/providers.mjs'

export async function register(event) {
    try {
        const { email, cpf, password } = JSON.parse(event.body)

        const result = await cognito.providerClient
            .send(new cognito.CreateUserCommand({
                UserPoolId: USER_POOL,
                Username: email ?? `${cpf}@email.com`,
                MessageAction: 'SUPPRESS',
            }))

        if (result.User) {
            await cognito.providerClient.send(new cognito.SetUserPassWordCommand({
                Password: password ??  '012345',
                UserPoolId: USER_POOL,
                Username: email ?? `${cpf}@email.com`,
                Permanent: true,
              }))
        }

        return sendResponse(200, { result })
    } catch (error) {
        console.error(error)
        return sendResponse(400, error)
    }
}
