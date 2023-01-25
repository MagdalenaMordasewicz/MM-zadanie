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

test('count tasks on list', async ({page}) => {
  await test.step ("Check if number of items in todo list at start", async () =>{    
    await toDoListPageObject.checkIfNumberOfTodosIsCorrect(page,3)})
  await test.step ("Add task to do list", async () =>{
    await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToAdd)
    await toDoListPageObject.enterAddTodoItem(page)
    await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToAdd)})
  await test.step ("Check if number of items in todo list is correct", async () =>{
    await toDoListPageObject.checkIfNumberOfTodosIsCorrect(page, 4)})
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
