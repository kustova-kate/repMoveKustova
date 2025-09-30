import { expect, Locator, Page } from '@playwright/test';

export default class HomePage{
    readonly page: Page;
    readonly signUpNowButton: Locator;
    readonly signInButton: Locator;
    readonly forgotPassword: Locator;
    readonly signInGoogle: Locator;
    readonly signInApple: Locator;
    readonly signInMicrosoft: Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpNowButton = page.locator('button:has-text("Sign Up Now")');
        this.signInButton = page.locator('app-button[buttontype="submit"]', { hasText: 'Sign In' });
        this.forgotPassword = page.locator('button:has-text("Forgot password")');
        this.signInGoogle = page.getByRole('button', {name: 'Sign In with Google'});
        this.signInApple = page.getByRole('button', {name: 'Sign In with Apple'});
        this.signInMicrosoft = page.getByRole('button', {name: 'Sign In with Microsoft'});
    }
    

    async openSignUpForm(){
        await this.signUpNowButton.click();
    }

    async clickSignIn(){
        await this.signInButton.click();
    }

    async openSignInFormGoogle() {
      const [popup] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.signInGoogle.click(), 
      ]);
      await popup.waitForLoadState();
      return popup;
      
  }

    async openSignInFormApple(){
        const [popup] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.signInApple.click(), 
      ]);
      await popup.waitForLoadState();
      return popup;
      
    }

    async openSignInFormMicrosoft(){
        const [popup] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.signInMicrosoft.click(), 
      ]);
      await popup.waitForLoadState();
      return popup;
    }

    async clickForgotPassword(){
        await this.forgotPassword.click();
    }
}
