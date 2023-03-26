import express from 'express';
import bodyParser from "body-parser";
import AppRoutes from './routes/App.routes';

class App {
    public port: number;
    public app: express.Application;

    constructor(port: number) {
        this.app = express();
        this.port = port;
    }

    public startServer() {
        this.app.use(bodyParser.json());

        this.app.use("/", AppRoutes);

        this.app.listen(this.port , () => {
            console.log(`Service started at port ${this.port}`);
        })
    }
}

export default App;