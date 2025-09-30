import {Locator , Page} from '@playwright/test';
import HomePage from './homePage';
import LoginForm from './loginForm';

export default class RegPage extends LoginForm{
    readonly signupButton: Locator =  this.page.getByRole('button', {name: 'Sign Up', exact: true});
    readonly signupName: Locator = this.page.locator('app-input[formcontrolname="firstName"] input');
    readonly signupLastName: Locator = this.page.locator('app-input[formcontrolname="lastName"] input');
    readonly signupEmail: Locator =  this.page.locator('app-input[formcontrolname="email"] input');
    readonly signupPassword: Locator = this.page.locator('app-input[formcontrolname="password"] input');
    readonly signupCompanyName: Locator =  this.page.locator('app-input[formcontrolname="companyName"] input');
    readonly signupPhone: Locator =  this.page.locator('app-input', { hasText: 'Phone' }).locator('input.__input');
    readonly signupIndustry: Locator =  this.page.locator('ng-select[formcontrolname="industry"]');
    readonly signupCountry: Locator =  this.page.locator('ng-select[placeholder="Country"] div[role="combobox"]');
    readonly signupOption: Locator =  this.page.getByRole('option');
    readonly validationMessageFirstName = this.page.getByText('The First Name is required');
    readonly validationMessageLastName = this.page.getByText('The Last Name is required');
    readonly validationMessageCompanyName = this.page.getByText('The Company Name is required');
    readonly validationMessageIndustry = this.page.getByText('Please, select the industry');
    readonly validationMessagePhone = this.page.getByText('The Phone is required');
    readonly validationMessageCountry = this.page.getByText('Wrong number format');
    readonly validationMessagePasswordLength = this.page.getByText('Min length for Password is 5');
    readonly errorSignUpMessage = this.page.getByText('Invalid to sign up');
    readonly logOutButton = this.page.locator('app-button', { hasText: 'Logout' });

    async signUp(firstName:string, lastName:string, companyName:string, industry:string, email: string, country:string, phone:string, password: string){
        await this.scrollUntilButtonVisible(this.signupButton);
        await this.signupName.fill(firstName);
        await this.signupLastName.fill(lastName);
        await this.signupCompanyName.fill(companyName);
        await this.signupIndustry.click();
        await this.signupOption.filter({hasText: industry}).click();
        await this.signupEmail.fill(email);
        await this.signupCountry.click();
        await this.signupOption.filter({hasText: country}).click();
        await this.signupPhone.fill(phone);
        await this.signupPassword.fill(password);
        await this.signupButton.click();
    }

    async scrollUntilButtonVisible(locator:Locator) {
        const maxScrolls = 20;
        for (let i = 0; i < maxScrolls; i++) {
            if (await locator.isVisible()) return;
            await this.page.evaluate(() => window.scrollBy(0, 500));
            await this.page.waitForTimeout(300);
        }
        throw new Error('Button not visible after maximum scrolls');
}

}