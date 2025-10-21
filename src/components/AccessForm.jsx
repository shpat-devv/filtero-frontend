import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_NAME } from "../constants";
import styles from "../styles/components/AccessForm.module.css";
import api from "../api.js";

export default function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [pfp, setPfp] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (method === "register" && (!username || !password || !email || !pfp)) {
            alert("Please fill in all fields for registration.");
            setLoading(false);
            return;
        }
        try {
            let res;
            if (method === "login") {
                res = await api.post(route, { username, password });
            } else if (method === "register") {
                res = await api.post(route, { username, password, "profile": { email, pfp } });
            } else {
                throw new Error("Invalid method");
            }

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem(USER_NAME, username);
                navigate("/"); 
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert(error.response?.data?.detail || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1>{name}</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className={styles.formInput}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.formInput}
            />
            {method === "register" && (
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={styles.formInput}
                />
            )}
            {method === "register" && (
                <input
                    type="text"
                    onChange={(e) => setPfp(e.target.value)}
                    placeholder="Profile Picture URL"
                    className={styles.formInput}
                />
            )}
            {method === "login" && (
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            )}
            {method === "register" && (
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            )}
            <button className={styles.formButton} type="submit" disabled={loading}>
                {loading ? "Loading..." : name}
            </button>
        </form>
    );
}
