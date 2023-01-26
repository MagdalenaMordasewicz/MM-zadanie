import { test, expect, chromium } from '@playwright/test';

import {toDoListPageObject} from "../page_object/toDoListPageObject";
import * as toDoListData from "../data/toDoListData.json"

test.beforeEach(async ({ page }) => {
  await toDoListPageObject.navigate(page)
});

test('has title', async ({ page }) => {
  await test.step ("Check if page has title", async () =>{
    await toDoListPageObject.checkPageTitle(page, toDoListData.pageTitle)})
});

test('add to do item', async ({page}) => {
  await test.step ("Add task to do list", async () =>{
    await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToAdd)
    await toDoListPageObject.enterAddTodoItem(page)})
  await test.step ("Check if task was added", async () =>{
    await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToAdd)})
})

test('completed to do item', async ({page}) => {
  await test.step ("Add task to do list", async () =>{
    await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToComplete)
    await toDoListPageObject.enterAddTodoItem(page)
    await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToComplete)})
  await test.step ("Get it marked as completed", async () =>{
    await toDoListPageObject.clickOnCompletedTask(page, toDoListData.taskToComplete)
    await toDoListPageObject.checkIfTaskIsCompleted(page, toDoListData.taskToComplete)})
})

test ('todo task count', async ({page}) => {
  const itemNum =  await test.step ("Count tasks on to do list at start", async () => {
    const i = toDoListPageObject.countItemsOnList(page) 
    return i;
  })
  await test.step("Add task to the list", async () => {
    await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToAdd)
    await toDoListPageObject.enterAddTodoItem(page)    
  })
  await test.step("Check if number of items in todo list is correct",async () => {
    await toDoListPageObject.checkIfNumberOfTodosIsCorrect(page, itemNum+1)})
  })  

test('delete to do item', async ({page}) => {
  await test.step ("Add task to do list", async () =>{
    await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToDelete)
    await toDoListPageObject.enterAddTodoItem(page)
    await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToDelete)})
  await test.step ("Delete item", async () =>{
    await toDoListPageObject.clickDeleteButton(page, toDoListData.taskToDelete)
    await toDoListPageObject.checkIfTaskWasDeleted(page, toDoListData.taskToDelete)})
})
