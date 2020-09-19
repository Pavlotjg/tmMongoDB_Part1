const {createArticle, asyncForEach} = require('./util');

//Create 5 articles per each type (a, b, c)
async function articleExample1(articlesCollection) {
  try {
    const types = ['a', 'b', 'c'];
    const articlesPerType = 5;
    await asyncForEach(types, async (type) => {
      for (let i = 0; i < articlesPerType; i++) {
        let article = createArticle({type});
        await articlesCollection.insertOne(article);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

//Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]
async function articleExample2(articlesCollection) {
  try {
    const articlesWithTypeA = await articlesCollection.find({type: 'a'}).toArray();
    await asyncForEach(articlesWithTypeA, async (doc) => {
      await articlesCollection.updateOne({_id: doc._id}, {$set: {tags: ['tag1-a', 'tag2-a', 'tag3']}});
    });
  } catch (err) {
    console.error(err);
  }
}

//Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a
async function articleExample3(articlesCollection) {
  try {
    const articlesExcludeTypeA = await articlesCollection.find({type: {$nin: ['a']}}).toArray();
    await asyncForEach(articlesExcludeTypeA, async (doc) => {
      await articlesCollection.updateOne({_id: doc._id}, {$set: {tags: ['tag2', 'tag3', 'super']}});
    });
  } catch (err) {
    console.error(err);
  }
}

//Find all articles that contains tags [tag2, tag1-a]
async function articleExample4(articlesCollection) {
  try {
    const articles = await articlesCollection.find({tags: {$elemMatch: {$in: ['tag2', 'tag1-a']}}}).toArray();
    console.log('All articles that contains tags [tag2, tag1-a]: ', articles);
  } catch (err) {
    console.error(err);
  }
}

//Pull [tag2, tag1-a] from all articles
async function articleExample5(articlesCollection) {
  try {
    await articlesCollection.updateMany(
      {},
      {$pull: {tags: {$in: ['tag2', 'tag1-a']}}}
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  articleExample1,
  articleExample2,
  articleExample3,
  articleExample4,
  articleExample5
};
