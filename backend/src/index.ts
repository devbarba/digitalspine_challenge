import '@boot/preloader';
import app from '@boot/app';
import Server from '@server';

const server = Server.init(app);

app.start(() => {
    server.start();
});
