import Advert from '../models/Advert';
import User from '../models/User';
import Collection from '../models/Collections';

const handleAdvertChange = async (change) => {
  const filter = { name: 'advert' };
  const incrementUpdate = { $inc: { count: 1 } };
  const decrementUpdate = { $inc: { count: -1 } };

  const options = { upsert: true };
  if (change.operationType === 'insert') {
    await Collection.findOneAndUpdate(filter, incrementUpdate, options).exec();
  } else if (change.operationType === 'delete') {
    await Collection.findOneAndUpdate(filter, decrementUpdate, options).exec();
  }
};

const handleUserChange = async (change) => {
  const filter = { name: 'user' };
  const incrementUpdate = { $inc: { count: 1 } };
  const decrementUpdate = { $inc: { count: -1 } };

  const options = { upsert: true };
  if (change.operationType === 'insert') {
    await Collection.findOneAndUpdate(filter, incrementUpdate, options).exec();
  } else if (change.operationType === 'delete') {
    await Collection.findOneAndUpdate(filter, decrementUpdate, options).exec();
  }
};

export async function startChangeStream() {
  try {
    const advertCollection = Advert.collection;
    const userCollection = User.collection;

    const advertStream = advertCollection.watch();
    const userStream = userCollection.watch();

    advertStream.on('change', handleAdvertChange);
    userStream.on('change', handleUserChange);
    console.log('Count stream started successfully');
  } catch (err) {
    console.log(err);
  }
}
