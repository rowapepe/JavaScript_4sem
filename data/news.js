export const newsData = [
    {
        id: 1,
        product: {
            src: "https://www.mos.ru/upload/newsfeed/news/de33648171b518875a25a01be5dceca3/post_elektrodepo_Troitskoe_Mishin.jpg",
            title: "Транспорт",
            text: "Сергей Собянин: Началось строительство крупнейшего в России электродепо",
            tags: ["транспорт","поезд","метро"],
        },
    },
    {
        id: 2,
        product: {
            src: "https://www.mos.ru/upload/newsfeed/news/7d74453c78a01d210ade3fedb5a3caa4/678Novikov.jpg",
            title: "Транспорт",
            text: "Сергей Собянин открыл второй Московский трамвайный диаметр",
            tags: ["транспорт","трамвай"],
        },
    },
    {
        id: 3,
        product: {
            src: "https://www.mos.ru/upload/newsfeed/articles/af971010e1dec978a803c7afa6b64935/abcfb70695682139ecd4a680c799e105.jpg",
            title: "Культура",
            text: "Волшебство сцены и добрые уроки: апрельские спектакли для детей в «Мосбилете»",
            tags: ["культура","спектакль"],
        },
    },
    {
        id: 4,
        product: {
            src: "https://www.mos.ru/upload/newsfeed/news/10d95730568d79919af75c727d2c8913/WoGOhsnSwxPC_novikov.jpg",
            title: "Строительство и реконструкция",
            text: "Около 60 детсадов и школ планируется открыть в Москве в 2026 году — Собянин",
            tags: ["строительство","реконструкция","детсад","школа"],
        },
    },
];

export function getNewsById(id) {
    const numericId = Number(id);
    return newsData.find((item) => item.id === numericId);
}
