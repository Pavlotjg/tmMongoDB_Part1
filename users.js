const {mapUser, getRandomFirstName, asyncForEach} = require('./util');

// - Create 2 users per department (a, b, c)
async function example1(userCollection) {
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
async function example2(userCollection) {
  try {
    await userCollection.deleteOne({department: 'a'});
  } catch (err) {
    console.error(err);
  }
}

// - Update firstName for users from department (b)
async function example3(userCollection) {
  try {
    const usersFromDeptB = await userCollection.find({department: 'b'}).toArray();
    await asyncForEach(usersFromDeptB, async (doc) => {
      await userCollection.updateOne({_id: doc._id}, { $set:{firstName: getRandomFirstName() + '_updated'}});
    });
  } catch (err) {
    console.error(err);
  }
}

// - Find all users from department (c)
async function example4(userCollection) {
  try {
    const usersFromDeptC = await userCollection.find({department: 'c'}).toArray();
    console.log('All users from department c: ',usersFromDeptC)
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  example1,
  example2,
  example3,
  example4
};
