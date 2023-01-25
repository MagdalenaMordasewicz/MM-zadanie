import {expect} from '@playwright/test';


const ulrTodolist = 'https://webdriveruniversity.com/To-Do-List/index.html'
const newTodoPlaceholder = 'Add new todo';


export class ToDoListPageObject{
    async navigate(page: any){
        await page.goto(ulrTodolist)
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
    async chceckIfTaskIsCompleted (page: any, value: string){
        await expect(page.locator(`text=${value}`)).toHaveClass('completed')
        await expect(page.locator(`text=${value}`)).not.toHaveClass('')
    }

    async checkHowManyElementsOnList (page: any, decimal: number){
        await expect(page.locator('li')).toHaveCount(decimal);
    }
    
    async clickDeleteButton (page: any, value: string){
        await page.getByText(value).hover()
        await page.getByRole('listitem').filter({hasText: value}).locator('i').click()
    } 
    async checkIfTaskWasDeleted (page: any, value: string){
        await expect(page.locator(`text=${value}`)).not.toBeVisible()
    } 

}

export const toDoListPageObject = new ToDoListPageObject()