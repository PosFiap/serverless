const sendResponse = require('../utils/sendResponse')
const { USER_POOL } = require('../const/paths')
const { cognito } = require('../const/providers')

module.exports.register = async (event) => {
    try {
        const { email, cpf, password } = JSON.parse(event.body)

        const result = await cognito
            .adminCreateUser({
                UserPoolId: USER_POOL,
                Username: email ?? `${cpf}@email.com`,
                MessageAction: 'SUPPRESS',
            })
            .promise()

        if (result.User) {
            await cognito
                .adminSetUserPassword({
                    Password: password ??  '012345',
                    UserPoolId: USER_POOL,
                    Username: email ?? `${cpf}@email.com`,
                    Permanent: true,
                })
                .promise()
        }

        return sendResponse(200, { result })
    } catch (error) {
        console.error(error)
        return sendResponse(400, error)
    }
}
