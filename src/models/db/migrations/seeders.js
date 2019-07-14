import dotenv from 'dotenv';
import utils from '../../../utils';

dotenv.config();
let seedersQuery;

if (process.env.NODE_ENV === 'production') {
  seedersQuery = `
    INSERT INTO users ( email, first_name, last_name, hashed_password, phone_number, address,  is_admin)
      VALUES ('admin@gmail.com', 'admin', 'admin', '${utils.hashPassword('password')}', 92912831212 , 'sadikuu lade', true ),       
        ('user@gmail.com', 'admin', 'admin', '${utils.hashPassword('password')}', 92912831212 , 'sadikuu lade', false ); 
`;
}
if (process.env.NODE_ENV === 'test') {
  seedersQuery = `
  INSERT INTO users ( email, first_name, last_name, hashed_password, phone_number, address,  is_admin)
    VALUES ('admin@gmail.com', 'admin', 'admin', '${utils.hashPassword('password')}', 92912831212 , 'sadikuu lade', true ),       
        ('user@gmail.com', 'admin', 'admin', '${utils.hashPassword('password')}', 92912831212 , 'sadikuu lade', false );
`;
}

const seeders = seedersQuery;
export default seeders;
