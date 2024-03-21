import { sendResponse } from '../utils/sendResponse.mjs'
import { formatUserAttributes } from '../utils/formatUserAttributes.js'
import { USER_POOL, USER_POOL_CLIENT } from '../const/paths.mjs'
import { cognito } from '../const/providers.mjs'

export async function login(event) {
    try {
        const { email, cpf, password } = JSON.parse(event.body)

        const response = await cognito
            .providerClient.send(new cognito.CreateAuthCommand({
                AuthFlow: 'ADMIN_NO_SRP_AUTH',
                UserPoolId: USER_POOL,
                ClientId: USER_POOL_CLIENT,
                AuthParameters: {
                    USERNAME: email ?? `${cpf}@email.com`,
                    PASSWORD: password ?? '012345',
                },
            }))

        const data = await cognito
            .providerClient.send(new cognito.GetUserCommand({
                AccessToken: response.AuthenticationResult.AccessToken,
            }))

        return sendResponse(200, {
            ...formatUserAttributes(data.UserAttributes),
            ...response.AuthenticationResult,
            statusCode: 200,
        })
    } catch (error) {
        console.error(error)
        return sendResponse(400, error)
    }
}
