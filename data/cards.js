export const cardsData = [
    {
        id: 1,
        card: {
            src: "assets/news.png",
            title: "Новости",
            text: "Актуальные новости на сегодня",
        },
        product: {
            src: "https://www.mos.ru/upload/newsfeed/news/de33648171b518875a25a01be5dceca3/post_elektrodepo_Troitskoe_Mishin.jpg",
            title: "Транспорт",
            text: "Сергей Собянин: Началось строительство крупнейшего в России электродепо",
        },
    },
    {
        id: 2,
        card: {
            src: "assets/services.png",
            title: "Услуги",
            text: "Можете записать на онлайн-консультацию к специалисту",
        },
        product: {
            src: "https://www.mos.ru/upload/schmetterling/4cmewMwAA8WKT_Sm/resources/img1.png",
            title: "Каталог услуг для жителей",
            text: "Здесь будут перечислены все возможные услуги",
        },
    },
    {
        id: 3,
        card: {
            src: "assets/help.png",
            title: "Помощь",
            text: "Инструкции для удобной жизни в Москве",
        },
        product: {
            src: "https://cdn-icons-png.flaticon.com/512/831/831629.png",
            title: "Популярные инструкции",
            text: "Инструкции для удобной жизни в Москве",
        },
    },
];

export function getCardById(id) {
    const numericId = Number(id);
    return cardsData.find((item) => item.id === numericId);
}
