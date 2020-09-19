const faker = require('faker');

const generateUser = ({
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  department,
  createdAt = new Date()
} = {}) => ({
  firstName,
  lastName,
  department,
  createdAt
});

const createArticle = ({
  name = faker.lorem.word(),
  description = faker.lorem.word(),
  type,
  tags = []
} = {}) => ({
  name,
  description,
  type,
  tags
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = {
  mapUser: generateUser,
  getRandomFirstName: () => faker.name.firstName(),
  createArticle,
  asyncForEach
};
