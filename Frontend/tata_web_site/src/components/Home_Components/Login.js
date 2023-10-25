const Login = ({setIsAuth}) => {
    const signIn = () => {
        setIsAuth(true);
    }
    return (
        <div className="App">
            <button onClick={signIn}></button>
        </div>
    )
}

export default Login
