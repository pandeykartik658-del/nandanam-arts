import { getEvents } from './src/sanity/client'; getEvents().then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
