import { MongoClient } from 'mongodb';

import { environment } from '../constants';

const client = new MongoClient(`mongodb+srv://${environment.MONGO_USER}:${environment.MONGO_PASS}@starpaylocal.llq96.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export const mongoClient = async (collectionName: string) => client
    .connect()
    .then(connection => connection.db(environment.MONGO_DB).collection(collectionName))
    .catch((err: Error) => {
        throw new Error('Não foi possível se conectar ao mongoDb, ' + err.message).message;
    });

