import { Schema, model } from 'mongoose';

const SessionSchema = new Schema({
  sid: { type: String, required: true, unique: true, index: true },
  expires: { type: Number, index: true, required: true },
  data: {},
});

const Session = model('session', SessionSchema);

export default Session;
