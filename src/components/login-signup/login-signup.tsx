import { createRef, useState } from "react";
import { authenticationHelper, fireBaseHelper } from "../../App";
import { IconButton } from "../misc/icon-button/icon-button";
import InputField from "../misc/input-field/input-field";
import "./login-signup.scss";

import login from "../../assets/login.svg";
import Helpers from "../../helpers/helpers";
import AlertHelper from "../../helpers/alert-helper";
import { User } from "@firebase/auth";
import LofiRoomsUser from "../../types/user";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  async function submit() {
    if (emailRef.current!.value === "" || passwordRef.current!.value === "") {
      return AlertHelper.infoToast("Fill in all the fields");
    }
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        if (isLogin) {
          await authenticationHelper.login(
            emailRef.current!.value,
            passwordRef.current!.value
          );
        } else {
          await authenticationHelper.signup(
            emailRef.current!.value,
            passwordRef.current!.value
          );

          const unsubscribe = authenticationHelper.auth.onAuthStateChanged(
            (user: User | null) => {
              if (user !== null)
                fireBaseHelper.saveUser(
                  new LofiRoomsUser(
                    user.displayName!,
                    user.email!,
                    user.uid,
                    user.emailVerified
                  )
                );
              unsubscribe();
            }
          );
        }

        AlertHelper.successToast("Logged in successfully");
      } catch (e) {
        AlertHelper.errorToast(Helpers.getFirebaseError(e));
        setIsSubmitting(false);
      }
    }
  }

  let title = isLogin ? "Login" : "Sign Up";

  let clickableClass = isSubmitting ? "hover-disabled" : "clickable";

  return (
    <div className="form">
      <h1 className="title">{title}</h1>
      <InputField type="email" label="Email" ref={emailRef} />
      <InputField type="password" label="Password" ref={passwordRef} />
      {isLogin && (
        <h4
          className={clickableClass}
          onClick={() => {
            if (!isSubmitting) {
              AlertHelper.textInputAlert(
                "Please Enter your email",
                async (email) => {
                  try {
                    AlertHelper.showLoading("Processing");
                    await authenticationHelper.resetPassword(email);
                    AlertHelper.successAlert(
                      "We've sent the reset password link to your email"
                    );
                  } catch (e) {
                    AlertHelper.errorToast(Helpers.getFirebaseError(e));
                  }
                }
              );
            }
          }}
        >
          Forgot password?
        </h4>
      )}
      <IconButton
        icon={login}
        isLoading={isSubmitting}
        text={title}
        className={`button ${isSubmitting ? "disabled-button" : ""}`}
        onClick={async () => (!isSubmitting ? submit() : "")}
      />
      <h4
        onClick={() => (!isSubmitting ? setIsLogin((current) => !current) : "")}
        className={clickableClass}
      >
        {isLogin ? "Sign up" : "Already have an account? Login"}
      </h4>
    </div>
  );
}
