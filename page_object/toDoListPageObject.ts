import {expect, Page} from '@playwright/test';

const ulrTodolist = 'https://webdriveruniversity.com/To-Do-List/index.html'
const newTodoPlaceholder = 'Add new todo'
const liLocator = 'li'
const iLocator = 'i'


export class ToDoListPageObject{
    async navigate(page: any){
        await page.goto(ulrTodolist)
    }

    async checkPageTitle (page: any, value: string){
        await expect(page).toHaveTitle(value);
   }

    async fillAddTodoItem (page: any, value: string){
        await page.getByPlaceholder(newTodoPlaceholder).fill(value)
    }

    async enterAddTodoItem (page: any){
        await page.getByPlaceholder(newTodoPlaceholder).press('Enter')
    }

    async checkIfTaskWasAdded (page: any, value: string){
        await expect(page.locator(`text=${value}`)).toHaveText(value)
    }

    async clickOnCompletedTask (page: any, value: string){
        await page.locator(`text=${value}`).click()
    }
    async checkIfTaskIsCompleted (page: any, value: string){
        await expect(page.locator(`text=${value}`)).toHaveClass('completed')
    }

    async checkIfNumberOfTodosIsCorrect (page: any, listItemsCount: number){
        await expect(page.locator(liLocator)).toHaveCount(listItemsCount)
    }

    async countItemsOnList (page:Page){
        const itemsNumber = await page.locator(liLocator).count();
        return itemsNumber;
    }
    
    async clickDeleteButton (page: any, value: string){
        await page.getByText(value).hover()
        await page.getByRole('listitem').filter({hasText: value}).locator(iLocator).click()
    } 
    async checkIfTaskWasDeleted (page: any, value: string){
        await expect(page.locator(`text=${value}`)).not.toBeVisible()
    } 
}

export const toDoListPageObject = new ToDoListPageObject()
