import {expect, Page} from '@playwright/test';

const ulrTodolist = 'https://webdriveruniversity.com/To-Do-List/index.html'
const newTodoPlaceholder = 'Add new todo'
const liLocator = 'li'
const iLocator = 'i'


export class ToDoListPageObject{
    async navigate(page: Page){
        await page.goto(ulrTodolist)
    }

    async checkPageTitle (page: Page, value: string){
        await expect(page).toHaveTitle(value);
   }

    async fillAddTodoItem (page: Page, value: string){
        await page.getByPlaceholder(newTodoPlaceholder).fill(value)
    }

    async enterAddTodoItem (page: Page){
        await page.getByPlaceholder(newTodoPlaceholder).press('Enter')
    }

    async checkIfTaskWasAdded (page: Page, value: string){
        await expect(page.locator(`text=${value}`)).toHaveText(value)
    }

    async clickOnCompletedTask (page: Page, value: string){
        await page.locator(`text=${value}`).click()
    }
    async checkIfTaskIsCompleted (page: Page, value: string){
        await expect(page.locator(`text=${value}`)).toHaveClass('completed')
    }

    async checkIfNumberOfTodosIsCorrect (page: Page, listItemsCount: number){
        await expect(page.locator(liLocator)).toHaveCount(listItemsCount)
    }

    async countItemsOnList (page:Page){
        const itemsNumber = await page.locator(liLocator).count();
        return itemsNumber;
    }
    
    async clickDeleteButton (page: Page, value: string){
        await page.getByText(value).hover()
        await page.getByRole('listitem').filter({hasText: value}).locator(iLocator).click()
    } 
    async checkIfTaskWasDeleted (page: Page, value: string){
        await expect(page.locator(`text=${value}`)).not.toBeVisible()
    } 
}

export const toDoListPageObject = new ToDoListPageObject()
