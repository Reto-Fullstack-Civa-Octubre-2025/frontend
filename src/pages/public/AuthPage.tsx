import {SignUpForm} from "../../components/SignUpForm.tsx";
import {SignInForm} from "../../components/SignInForm.tsx";
import "../../styles/AuthPage.css";

export function AuthPage() {
    return (
        <>
            <div className="auth-header"> Reto Fullstack Civa</div>
            <div className="auth-page">
                <SignInForm/>
                <div className="separator"></div>
                <SignUpForm/>
            </div>
        </>
    )
}