import { test, expect } from '@playwright/test';; 
import RegPage from '../pages/registrationForm';
import LoginFor  from '../pages/loginForm';

test.describe('Log in Form',  () => {
    let regPage: RegPage;
    const userEmail = process.env.EMAIL;
    const userPassword = process.env.PASSWORD; 
    const wrongUserEmail = process.env.WRONG_EMAIL;
    const wrongUserPassword = process.env.WRONG_PASSWORD; 
    
    test.beforeEach('', async ({page})=>{
       regPage = new RegPage(page);
       await page.goto('/');
    });

    test('All fields are required', async ({page})=>{
        await regPage.signInButton.click();
        await expect(regPage.validationMessageEmail).toBeVisible();
        await expect(regPage.validationMessagePassword).toBeVisible();
    });

    test('Unsuccesfully login if wrong email', async ({page})=>{
        await regPage.login(wrongUserEmail as string, userPassword as string);
        await expect(regPage.errorSignInMessage).toBeVisible();
    });

    test('Unsuccesfully login if wrong password', async ({page})=>{
        await regPage.login(userEmail as string, wrongUserPassword as string);
        await expect(regPage.errorSignInMessage).toBeVisible();
    });
     
    test('Unsuccessfull reset password', async ({page})=>{
        await regPage.sendForgotPassword(wrongUserEmail as string);
       await expect(regPage.errorForgotPasswordMessage).toBeVisible();
       
    });

    test('Successfull login', async ({page})=>{
        await regPage.login(userEmail as string, userPassword as string);
        await expect(page).toHaveURL(/.*dashboard/);
        await regPage.logOutButton.click();
        await expect(page).toHaveURL(/.*sign-in/);
    });

    
    test.only('Success reset password', async ({page})=>{
        await regPage.sendForgotPassword(userEmail as string);
        await expect(regPage.successResetPassword).toContainText(`The link with instruction was sent to ${userEmail}`);
        
    });

    test('Sign In with Google', async ({page})=>{
        const popup = await regPage.openSignInFormGoogle();
        await expect(popup.url()).toContain('providerId=google.com');
    });

    test('Sign In with Apple', async ({page})=>{
        const popup = await regPage.openSignInFormApple();
        await expect(popup.url()).toContain('providerId=apple.com');
    });

    test('Sign In with Microsoft', async ({page})=>{
        const popup = await regPage.openSignInFormMicrosoft();
        await expect(popup.url()).toContain('providerId=microsoft.com');
    });


});
