import { app } from './app';
import { environment } from './constants';

app.listen(environment.PORT, () => console.info(`server runing at http://localhost:${environment.PORT}`));
