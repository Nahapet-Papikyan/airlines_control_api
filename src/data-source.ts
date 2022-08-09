const dotenv = require('dotenv')
import { DataSource } from 'typeorm'
import configs from './database/configs'

dotenv.config();

const dataSource = new DataSource(configs().database);

export default dataSource;