import app from './app'
import config from './config/congif'

app.listen(config.port, () =>
    console.log(`Сервер запущен на ${config.port} порту`)
)
