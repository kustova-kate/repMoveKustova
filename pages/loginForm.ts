import {Locator , Page} from '@playwright/test';
import HomePage from './homePage';

export default class LoginForm extends HomePage{
   
    readonly signInEmail: Locator =  this.page.locator('app-input[formcontrolname="email"] input');
    readonly signInPassword: Locator = this.page.locator('app-input[formcontrolname="password"] input');
    readonly sendRecoveryLink: Locator = this.page.getByRole('button', {name: 'Send Recovery Link'});
    readonly validationMessageEmail = this.page.getByText('Please, enter your email address');
    readonly validationMessagePassword = this.page.getByText('The Password is required');
    readonly errorSignInMessage = this.page.getByText('Invalid to login');
    readonly errorForgotPasswordMessage = this.page.getByText('Invalid to reset password');
    readonly successResetPassword = this.page.locator('#toast-container');

    

    async login(email: string, password: string){
       await this.signInEmail.fill(email);
       await this.signInPassword.fill(password);
       await this.signInButton.click();
    }

    async sendForgotPassword(email: string){
       await this.clickForgotPassword();
       await this.signInEmail.fill(email);
       await this.sendRecoveryLink.click();
    }

}