import {expect,test, Page} from '@playwright/test';

const ulrTodolist = 'https://webdriveruniversity.com/To-Do-List/index.html'
const newTodoPlaceholder = 'Add new todo'
const liLocator = 'li'
const iLocator = 'i'


export class ToDoListPageObject{
    async navigate(page: Page){
        await test.step("Navigate to given url", async () => {
        await page.goto(ulrTodolist)})
    }

    async checkPageTitle (page: Page, value: string){       
        await test.step("Check if page has title", async () => {
        await expect(page).toHaveTitle(value)});
   }

    async fillAddTodoItem (page: Page, value: string){
        await test.step("Fill add to do text box", async () => {
        await page.getByPlaceholder(newTodoPlaceholder).fill(value)})
    }

    async enterAddTodoItem (page: Page){
        await test.step("Press enter", async () => {
        await page.getByPlaceholder(newTodoPlaceholder).press('Enter')})
    }

    async checkIfTaskWasAdded (page: Page, value: string){
        await test.step("Check if task was added", async () => {
        await expect(page.locator(`text=${value}`)).toHaveText(value)})
    }

    async clickOnCompletedTask (page: Page, value: string){
        await test.step("Click on completed task", async () => {
        await page.locator(`text=${value}`).click()})
    }
    async checkIfTaskIsCompleted (page: Page, value: string){
        await test.step("Check if task was completed", async () => {
        await expect(page.locator(`text=${value}`)).toHaveClass('completed')})
    }

    async checkIfNumberOfTodosIsCorrect (page: Page, listItemsCount: number){
        await test.step("Check if amount of to do's is correct", async () => {
        await expect(page.locator(liLocator)).toHaveCount(listItemsCount)})
    }

    async countItemsOnList (page:Page){
        const itemCount = await test.step("Count items on to do list", async () => {
        return await page.locator(liLocator).count()})
        return itemCount;
    }
    
    async clickDeleteButton (page: Page, value: string){
        await test.step("Click delete button", async () => {
        await page.getByText(value).hover()
        await page.getByRole('listitem').filter({hasText: value}).locator(iLocator).click()})
    } 
    async checkIfTaskWasDeleted (page: Page, value: string){
        await test.step("Check if task was deleted", async () => {
        await expect(page.locator(`text=${value}`)).not.toBeVisible()})
    } 
}

export const toDoListPageObject = new ToDoListPageObject()
