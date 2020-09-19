'use strict';
const {example1, example2, example3, example4} = require('./users');
const {articleExample1, articleExample2, articleExample3, articleExample4, articleExample5} = require('./articles');

// db connection and settings
const connection = require('./config/connection');

run();

async function run() {
  await connection.connect();
  await runUsers();
  await runArticles();
  await connection.close();
}

async function runUsers() {
  await connection.get().dropCollection('Users');
  const userCollection = connection.get().collection('Users');
  await example1(userCollection);
  await example2(userCollection);
  await example3(userCollection);
  await example4(userCollection);
}

async function runArticles() {
  await connection.get().dropCollection('Articles');
  const articlesCollection = connection.get().collection('Articles');
  await articleExample1(articlesCollection);
  await articleExample2(articlesCollection);
  await articleExample3(articlesCollection);
  await articleExample4(articlesCollection);
  await articleExample5(articlesCollection);
}
