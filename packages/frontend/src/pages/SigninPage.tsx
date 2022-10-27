import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [warning, setWarning] = useState<string>("");

	const navigate = useNavigate();

	const handleOnClick = async (): Promise<void> => {
		if (!username || !password) {
			setWarning("username, password are required");
		}
		const signinResponse = await axios.post(
			`${process.env.REACT_APP_WEBSHOP}/api/user/loginUser`,
			{
				username: username,
				password: password,
			}
		);
		if (signinResponse && signinResponse.status === 200) {
			localStorage.setItem("webshop", signinResponse.data.token);
			navigate("/");
		}
	};

	return (
        <div>
            Sign in
			<div>
			<input
				type="email"
				id="typeEmailX"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<label htmlFor="typeEmailX">
				Username
			</label>
			<input
				type="password"
				id="typePasswordX"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<label htmlFor="typePasswordX">
				Password
			</label>
			<button
				onClick={handleOnClick}
				type="submit"
			>
				Login
			</button>

			</div>
        </div>
	);
}

