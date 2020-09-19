'use strict';
const faker = require('faker');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const {mapUser, getRandomFirstName} = require('./util');

// db connection and settings
const connection = require('./config/connection');
let userCollection;
run();

async function run() {
  await connection.connect();
  await connection.get().dropCollection('Users');
  userCollection = connection.get().collection('Users');

  await example1();
  await example2();
  await example3();
  await example4();
  await connection.close();
}

// #### Users

// - Create 2 users per department (a, b, c)
async function example1() {
  try {
    const departments = ['a', 'b', 'c'];
    const usersPerDept = 2;
    await asyncForEach(departments, async (deptName) => {
      for(let i = 0; i < usersPerDept; i++){
        let user = mapUser({department: deptName});
        await userCollection.insertOne(user);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

// - Delete 1 user from department (a)

async function example2() {
  try {
    await userCollection.deleteOne({department: 'a'});
  } catch (err) {
    console.error(err);
  }
}

// - Update firstName for users from department (b)

async function example3() {
  try {
    const usersFromDeptB = await userCollection.find({department: 'b'}).toArray();
    await asyncForEach(usersFromDeptB, async (doc) => {
        await userCollection.updateOne({_id: doc._id}, { $set:{firstName: faker.name.firstName()+'_updated'}});
    });
  } catch (err) {
    console.error(err);
  }
}

// - Find all users from department (c)
async function example4() {
  try {
    const usersFromDeptC = await userCollection.find({department: 'c'}).toArray();
    console.log('All users from department c: ',usersFromDeptC)
  } catch (err) {
    console.error(err);
  }
}
