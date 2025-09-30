import { test, expect } from '@playwright/test';; 
import RegPage from '../pages/registrationForm';

test.describe('Registration Form',  () => {
    let regPage: RegPage;
    const randomInt = Math.floor(Math.random() * 10000);
    const uniqueEmail =`aqa.kustova+${randomInt}@gmail.com`; 
    const password='Kat12345';
   
    
    test.beforeEach('', async ({page})=>{
       regPage = new RegPage(page);
       await page.goto('/');
       await regPage.openSignUpForm();
    });

    test('All fields (except Country) are required', async ({page})=>{
        await regPage.scrollUntilButtonVisible(regPage.signupButton);
        await regPage.signupButton.click();
        await expect(regPage.validationMessageFirstName).toBeVisible();
        await expect(regPage.validationMessageLastName).toBeVisible();
        await expect(regPage.validationMessageCompanyName).toBeVisible();
        await expect(regPage.validationMessageIndustry).toBeVisible();
        await expect(regPage.validationMessagePhone).toBeVisible();
        await expect(regPage.validationMessageEmail).toBeVisible();
        await expect(regPage.validationMessagePassword).toBeVisible();
    });

    test('Error if wrong number format', async ({page})=>{
        await regPage.scrollUntilButtonVisible(regPage.signupCountry);
        await regPage.signupCountry.click();
        await regPage.signupOption.filter({hasText: '+380'}).click();
        await regPage.signupPhone.fill('12345abc');
        await expect(regPage.validationMessageCountry).toBeVisible();
    });

    test('Error if password length less than 5', async ({page})=>{
        await regPage.scrollUntilButtonVisible(regPage.signupPassword);
        await regPage.signupPassword.fill("1234");
        await expect(regPage.validationMessagePasswordLength).toBeVisible();
    });

    test('Successfull registration + error if duplicated registration', async ({page})=>{
        await regPage.signUp('Kateryna', 'Kustova', 'AQA', 'Distributor', uniqueEmail, '+380', '993453322', password);
        await expect(page).toHaveURL(/.*dashboard/);
        await regPage.logOutButton.click();
        await expect(page).toHaveURL(/.*sign-in/);

        //duplicated registration
        await regPage.openSignUpForm();
        await regPage.signUp('Kateryna', 'Kustova', 'AQA', 'Distributor', uniqueEmail, '+380', '993453322', password);
        await expect(regPage.errorSignUpMessage).toBeVisible();
    });

});
