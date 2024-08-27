import { createReducer, on, Action } from "@ngrx/store";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginState } from "./LoginState";
import { AppInitialState } from "../AppInitialState";

const intialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  intialState,
  on(recoverPassword, currentState => ({
    ...currentState,
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: true
  })),
  on(recoverPasswordSuccess, currentState => ({
    ...currentState,
    error: null,
    isRecoveredPassword: true,
    isRecoveringPassword: false
  })),
  on(recoverPasswordFail, (currentState, action) => ({
    ...currentState,
    error: action.error,
    isRecoveredPassword: false,
    isRecoveringPassword: false
  })),

  // Handler untuk login
  on(login, currentState => ({
    ...currentState,
    error: null,
    isLoggedIn: false,
    isLoggingIn: true,
  })),
  on(loginSuccess, currentState => {
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false
    }
  }),
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false
    }
  })

)

// Fungsi reducer yang akan diekspor
export function loginReducer(state: LoginState | undefined, action: Action) {
  return reducer(state, action);
}
