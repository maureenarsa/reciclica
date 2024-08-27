import { User } from "src/app/model/user/User";
import { AppInitialState } from "../AppInitialState";
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail, login, loginSuccess, loginFail } from "./login.actions";
import { loginReducer } from "./login.reducers";
import { LoginState } from "./LoginState";

describe("Login store", () => {

  it('recoverPassword', () => {
    const intialState: LoginState = AppInitialState.login;
    const newState = loginReducer(intialState, recoverPassword({email: "any@email.com"}));
    expect(newState).toEqual({
      ...intialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    })
  })
  it('recoverPasswordSuccess', () => {
    const intialState: LoginState = AppInitialState.login;
    const newState = loginReducer(intialState, recoverPasswordSuccess());
    expect(newState).toEqual({
      ...intialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    })
  })
  it('recoverPasswordFail', () => {
    const intialState: LoginState = AppInitialState.login;
    const error = {error: 'error'};
    const newState = loginReducer(intialState, recoverPasswordFail({error}));
    expect(newState).toEqual({
      ...intialState,
      error,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    })
  })

  it('login', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, login({email: "valid@email.com", password: "anyPassword"}));
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true
    })
  })

  it('loginSuccess', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true
    };
    const user = new User();
    user.id = "anyId";
    const newState = loginReducer(initialState, loginSuccess({user}));
    expect(newState).toEqual({
      ...initialState,
      isLoggedIn: true,
      isLoggingIn: false
    })
  })

  it('loginFail', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true
    };
    const error = {error: 'error'};
    const newState = loginReducer(initialState, loginFail({error}));
    expect(newState).toEqual({
      ...initialState,
      error,
      isLoggedIn: false,
      isLoggingIn: false
    })
  })
})
