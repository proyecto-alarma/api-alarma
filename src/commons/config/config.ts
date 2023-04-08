import { registerAs } from '@nestjs/config';

export default registerAs('general', () => ({
    DATABASE_URL: process.env.DATABASE_URL,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    USER_ID: process.env.USER_ID,
    PASS_USER_ID: process.env.PASS_USER_ID,
    PORT: process.env.PORT,
    PASS_DEFAULT: process.env.PASS_DEFAULT,
}));
