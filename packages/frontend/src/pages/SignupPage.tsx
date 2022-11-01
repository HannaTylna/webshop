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
			setWarning("username, email and password are required");
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
    <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card text-dark">
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-4 mt-md-4 pb-5">
                                <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                                <p className="text-secondary-50 mb-5">
									Create an account
								</p>
                                <div className="form-outline form-white mb-4">
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="username">
                                        Username
                                    </label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="useremailname">
                                        Email
                                    </label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg px-5"
                                    onClick={handleOnClick}
                                    type="submit"
                                >
                                    sign up
                                </button>
                            </div>
                            <div>
                                {warning && (
                                    <div className="alert alert-warning" role="alert">
                                        {warning}
                                    </div>
                                )}
                            </div>
                            <div className="mb-1 pb-5">
									<p className="mb-0">
										Already a member?{" "}
										<a href="/signin" className="text-primary-50 fw-bold">
											Sign in
										</a>
									</p>
								</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</section>    
  )
}
