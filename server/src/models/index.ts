import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
// import {CarFactory} from './car.js';

const User = UserFactory(sequelize);
// const Car = CarFactory(sequelize);

export { User }; // , Car for export example
