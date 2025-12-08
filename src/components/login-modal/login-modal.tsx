import { FC } from "react";
import styled from "styled-components";

const ModalOverlay = styled.dialog`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: var(--white);

  z-index: 1;
`;

const OverlayExitButton = styled.button`
  position: absolute;

  top: var(--padding-large);
  right: var(--padding-large);

  background: none;
  padding: var(--padding-medium);
  margin: 0;
`;

const ModalContent = styled.div`
  position: absolute;
  display: flex;
  gap: 50px;
  justify-content: center;

  height: fit-content;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const FormHeading = styled.h3`
  text-align: center;
  font-size: 2rem;
  margin: 0;
  padding-top: var(--padding-large);
`;
const FormLabel = styled.label`
  display: block;

  height: var(--input-height);
  width: 100%;

  margin: auto 0;

  font-size: 1.5rem;
`;

const LoginOrCreateAccountForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 500px;

  background-color: var(--background-two);
  border: 1px solid var(--black);
  border-radius: var(--border-small);
`;

const FormInput = styled.input`
  display: block;
  height: var(--input-height);
  width: 100%;
  margin-left: auto;
`;

const FormSubmit = styled.button`
  display: block;
  margin: 0 auto var(--padding-large) auto;
`;

type ModalProps = { open: boolean; closeModal: () => void };

export const LoginModal: FC<ModalProps> = ({ open, closeModal }) => {
  return (
    <ModalOverlay open={open}>
      <OverlayExitButton onClick={closeModal}>Close</OverlayExitButton>
      <ModalContent>
        <LoginOrCreateAccountForm>
          <FormHeading>Login</FormHeading>
          <AccountDetails />
        </LoginOrCreateAccountForm>
        <LoginOrCreateAccountForm>
          <FormHeading>Create Account</FormHeading>
          <AccountDetails />
        </LoginOrCreateAccountForm>
      </ModalContent>
    </ModalOverlay>
  );
};

const FormBody = styled.div`
  display: flex;

  padding: var(--padding-large);

  --input-height: 2rem;
`;
const Labels = styled.div`
  width: 150px;
`;
const Inputs = styled.div`
  width: auto;
`;
const AccountDetails: FC = () => {
  const usernameInputId = "UsernameInput";
  const passwordInputId = "PasswordInput";
  return (
    <>
      <FormBody>
        <Labels>
          <FormLabel htmlFor={usernameInputId}>Username:</FormLabel>
          <FormLabel htmlFor={passwordInputId}>Password:</FormLabel>
        </Labels>
        <Inputs>
          <FormInput
            id={usernameInputId}
            name="username"
            autoComplete="true"
            type="username"
          />
          <FormInput
            id={passwordInputId}
            name="password"
            autoComplete="true"
            type="password"
          />
        </Inputs>
      </FormBody>
      <FormSubmit>Submit</FormSubmit>
    </>
  );
};
