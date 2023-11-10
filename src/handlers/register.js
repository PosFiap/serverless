const sendResponse = require('../utils/sendResponse')
const { USER_POOL } = require('../const/paths')
const { cognito } = require('../const/providers')

module.exports.register = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body)

        const result = await cognito
            .adminCreateUser({
                UserPoolId: USER_POOL,
                Username: email,
                UserAttributes: [
                    {
                        Name: 'email',
                        Value: email,
                    },
                    {
                        Name: 'email_verified',
                        Value: 'true',
                    },
                ],
                MessageAction: 'SUPPRESS',
            })
            .promise()

        if (result.User) {
            await cognito
                .adminSetUserPassword({
                    Password: password,
                    UserPoolId: USER_POOL,
                    Username: email,
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
