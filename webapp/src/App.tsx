import {JSX, useContext} from 'react'
import {
    AuthContext,
    AuthProvider,
    type IAuthContext,
    type TAuthConfig,
    TRefreshTokenExpiredEvent
} from 'react-oauth2-code-pkce'

const authConfig: TAuthConfig = {
    clientId: 'oidc-client',
    authorizationEndpoint: 'http://localhost:9000/oauth2/authorize',
    tokenEndpoint: 'http://localhost:9000/oauth2/token',
    redirectUri: 'http://localhost:8080/',
    scope: 'openid profile',
    extraTokenParameters: {
        grant_type: 'authorization_code',
    },
    onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
}

function LoginInfo(): JSX.Element {
    const { tokenData, token, logIn, logOut, error }: IAuthContext = useContext(AuthContext)

    if (error) {
        return (
            <>
                <div style={{ color: 'red' }}>An error occurred during authentication: {error}</div>
                <button onClick={() => logOut()}>Log out</button>
            </>
        )
    }

    return (
        <>
            {token ? (
                <>
                    <div>
                        <h4>Access Token (JWT)</h4>
                        <pre
                            style={{
                                width: '400px',
                                margin: '10px',
                                padding: '5px',
                                border: 'black 2px solid',
                                wordBreak: 'break-all',
                                whiteSpace: 'break-spaces',
                            }}
                        >
              {token}
            </pre>
                    </div>
                    <div>
                        <h4>Login Information from Access Token (Base64 decoded JWT)</h4>
                        <pre
                            style={{
                                width: '400px',
                                margin: '10px',
                                padding: '5px',
                                border: 'black 2px solid',
                                wordBreak: 'break-all',
                                whiteSpace: 'break-spaces',
                            }}
                        >
              {JSON.stringify(tokenData, null, 2)}
            </pre>
                    </div>
                    <button onClick={() => logOut()}>Log out</button>
                </>
            ) : (
                <>
                    <div>You are not logged in.</div>
                    <button onClick={() => logIn()}>Log in</button>
                </>
            )}
        </>
    )
}

function App() {
    return (
        <div>
            <div>
                <h1>Demo using the 'react-oauth2-code-pkce' package</h1>
            </div>
            <AuthProvider authConfig={authConfig}>
                {/* @ts-ignore*/}
                <LoginInfo />
            </AuthProvider>
        </div>
    );
}

export default App;