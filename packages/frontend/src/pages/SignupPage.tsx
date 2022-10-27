import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [warning, setWarning] = useState<string>("");

    const navigate = useNavigate()
    
    const handleOnClick = async ():Promise<void> => {
        if (!username || !password || !email) {
			setWarning("username, password are required");
		}
        const signupResponse = await axios.post(
			`${process.env.REACT_APP_WEBSHOP}/api/user/signUp`,
			{
				username,
                email,
				password
			}
		);        
        if (signupResponse && signupResponse.status === 200) {
			navigate("/signin");
		}
        
    }

  return (
    <div>
        <div>SignupPage</div>
        <label htmlFor="usernameInput">Username</label>
        <input id='usernameInput' type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label htmlFor="emailInput">email</label>
        <input id='emailInput' type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <label htmlFor="passwordInput">Password</label>
        <input id='passwordInput' type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="submit" onClick={handleOnClick}>Sign in</button>
    </div>
    
  )
}
