import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'heroku-logger';
// import { resolve } from 'path';
import router from './routes';
// import { multerUploads, dataUri } from './middleware/multer';
// import { cloudinaryConfig, uploader } from './config/cloudinary.config';

const app = express();

const PORT = process.env.PORT || 5000;

// parse incoming data with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('*', cloudinaryConfig);

app.use(cors());
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to propertypro-lite 2019',
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Sorry endpoint does not exist',
  });
});

logger.info('Im here bro on port', PORT);
app.listen(PORT);

export default app;
