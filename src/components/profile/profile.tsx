import { sendEmailVerification, signOut } from "@firebase/auth";
import Modal from "react-modal";
import { authenticationHelper, fireBaseHelper } from "../../App";
import {
  useModalProfile,
  useModalProfileUpdate,
} from "../../global-state/profile-modal-provider";
import { useUser, useUserUpdate } from "../../global-state/user-provider";
import Helpers from "../../helpers/helpers";
import LoginSignup from "../login-signup/login-signup";

import "./profile.scss";
import { IconButton } from "../misc/icon-button/icon-button";
import { useEffect, useState } from "react";
import AlertHelper from "../../helpers/alert-helper";

import verified from "../../assets/verified.svg";
import logout from "../../assets/logout.svg";
import editImage from "../../assets/edit_image.svg";
import defaultProfile from "../../assets/default_profile.png";
import edit from "../../assets/edit.svg";
import LofiRoomsUser from "../../types/user";

export default function Profile() {
  const [hasSentVerification, setHasSentVerification] = useState(false);

  const [userImage, setUserImage] = useState<string | null>(null);

  const isOpen = useModalProfile();
  const toggleModal = useModalProfileUpdate();

  const user = useUser();
  const userUpdate = useUserUpdate();

  useEffect(() => {
    async function getImage() {
      let image = await fireBaseHelper.getUserImage(user!.id);
      setUserImage(image);
    }
    if (user !== null) getImage();
  }, [user, userImage]);

  function clearState() {
    setHasSentVerification(false);
    setUserImage(null);
  }

  if (user === null) {
    return <LoginModal />;
  }

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className="profile-modal"
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={() => toggleModal()}
    >
      <div className="profile-card">
        <div className="user-card">
          <div className="user-image">
            <img
              src={userImage ?? defaultProfile}
              alt="user_image"
              className="image"
            />
            <IconButton
              icon={editImage}
              isLoading={false}
              className="edit"
              onClick={() =>
                AlertHelper.fileInputAlert(
                  "Upload an image",
                  "image/*",
                  async (image) => {
                    AlertHelper.showLoading("Uploading Image");
                    if (await fireBaseHelper.uploadImage(user.id, image)) {
                      AlertHelper.successToast("Image Successfully uploaded!");
                      setUserImage(null);
                    } else {
                      AlertHelper.errorToast("Failed to upload image");
                    }
                  }
                )
              }
            />
          </div>
          <div className="user-details">
            <div className="user-status">
              <h3 className="user-name">
                <span>{user.name}</span>
                <img
                  src={edit}
                  alt="edit"
                  className="icon"
                  onClick={() => {
                    AlertHelper.textInputAlert(
                      "Enter New Display name",
                      async (newName) => {
                        if (newName.length > 0) {
                          AlertHelper.showLoading("Updating Display name");
                          try {
                            await authenticationHelper.updateName(newName);
                            AlertHelper.successToast("Display name updated!");
                            const unsubscribe =
                              authenticationHelper.auth.onAuthStateChanged(
                                (user) => {
                                  if (user !== null)
                                    fireBaseHelper.saveUser(
                                      new LofiRoomsUser(
                                        user.displayName!,
                                        user.email!,
                                        user.uid,
                                        user.emailVerified
                                      )
                                    );
                                  userUpdate(user);
                                  unsubscribe();
                                }
                              );
                            authenticationHelper.triggerUpdate();
                          } catch (e) {
                            AlertHelper.errorToast(Helpers.getFirebaseError(e));
                          }
                        }
                      }
                    );
                  }}
                />
              </h3>
              <div
                className={`verified ${!user.isVerified && "unverified"}`}
                onClick={() => {
                  if (!user.isVerified) {
                    AlertHelper.confirmDialog({
                      question: "Send verification link to your email?",
                      onConfirm: async () => {
                        if (hasSentVerification) {
                          return window.location.reload();
                        }
                        AlertHelper.showLoading("Sending Verification email");
                        try {
                          await sendEmailVerification(
                            authenticationHelper.auth.currentUser!,
                            { url: "https://jlalunio.codes/chat-rooms" }
                          );
                          setHasSentVerification(true);

                          AlertHelper.successToast(
                            "Email Sent! Please check your inbox"
                          );
                        } catch (e) {
                          AlertHelper.errorToast(Helpers.getFirebaseError(e));
                        }
                      },
                      confirmButtonColor: "green",
                    });
                  }
                }}
              >
                <span>{user.isVerified ? "verified" : "unverified"}</span>
                <img
                  src={verified}
                  alt="verified-icon"
                  className="verified-icon"
                />
              </div>
            </div>
          </div>
        </div>
        <IconButton
          icon={logout}
          isLoading={false}
          text="Logout"
          className="logout"
          onClick={() => {
            try {
              signOut(authenticationHelper.auth);
              clearState();
              AlertHelper.successToast("Logged out successfully");
            } catch (e) {
              AlertHelper.errorToast(Helpers.getFirebaseError(e));
            }
          }}
        />
      </div>
    </Modal>
  );
}

function LoginModal() {
  const isOpen = useModalProfile();
  const toggleModal = useModalProfileUpdate();

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className="login-modal"
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={() => toggleModal()}
    >
      <LoginSignup />
    </Modal>
  );
}
