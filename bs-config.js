module.exports = {
    files: ['pages/**/*.{js,ts,jsx,tsx}', 'components/**/*.{js,ts,jsx,tsx}', 'public/**/*'],
    proxy: 'http://localhost:3000', // URL вашего Next.js сервера
    port: 3001, // Порт для browser-sync
    open: false, // Не открывать автоматически браузер
    notify: false, // Отключить уведомления
    host: '0.0.0.0', // Слушать все интерфейсы
    https: true
    // Обеспечивает доступ через ваш IP-адрес в сети
};