import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { categories, products } from "./constants";

async function up() {
    await prisma.users.createMany({
        data: [
            {
                Name_user: 'Di',
                Email_user: 'tolyan@mail.com',
                Password_user: hashSync('2630', 10),
                role: "User",
                verified: new Date(),
                Points: 100
            },
            {
                Name_user: 'Admin',
                Email_user: 'admin@mail.com',
                Password_user: hashSync('2630', 10),
                role: "Admin",
                verified: new Date()
            }
        ]
    }
    );
    await prisma.productCategories.createMany({
        data: categories,
    });
    await prisma.products.createMany({
        data: products,
    });
    const pizza1 = await prisma.products.create({
        data: {
            name: 'Пепперони фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            description: "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус"
        },
    });

    const pizza2 = await prisma.products.create({
        data: {
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            description: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо"
        },
    });

    const pizza3 = await prisma.products.create({
        data: {
            name: 'Чоризо фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            description: "Острые колбаски чоризо, сладкий перец, моцарелла, фирменный томатный соус"
        },
    });
    await prisma.pizzaSizes.createMany({
        data: [
            {
                Size_name: "25"
            },
            {
                Size_name: "30"
            },
            {
                Size_name: "35"
            },
        ]
    })
    await prisma.productItems.createMany({
        data: [
            //Пепперони 
            {
                Product_ID: pizza1.ID_Product,
                Size_ID: 1,
                Price: 369,
            },
            {
                Product_ID: pizza1.ID_Product,
                Size_ID: 2,
                Price: 629,
            },
            {
                Product_ID: pizza1.ID_Product,
                Size_ID: 3,
                Price: 749,
            },
            //Сырная
            {
                Product_ID: pizza2.ID_Product,
                Size_ID: 1,
                Price: 339,
            },
            {
                Product_ID: pizza2.ID_Product,
                Size_ID: 2,
                Price: 559,
            },
            {
                Product_ID: pizza2.ID_Product,
                Size_ID: 3,
                Price: 689,
            },
            //Чоризо
            {
                Product_ID: pizza3.ID_Product,
                Size_ID: 1,
                Price: 339,
            },
            {
                Product_ID: pizza3.ID_Product,
                Size_ID: 2,
                Price: 539,
            },
            {
                Product_ID: pizza3.ID_Product,
                Size_ID: 3,
                Price: 759,
            },
            //Омлет с ветчиной и грибами
            {
                Product_ID: 1,
                Price: 209,
            },
            //Дэнвич ветчина и сыр
            {
                Product_ID: 2,
                Price: 279,
            },
            //Нагетсы
            {
                Product_ID: 3,
                Price: 179,
            },
            //Картошка
            {
                Product_ID: 4,
                Price: 180,
            },
            //К.Ш.
            {
                Product_ID: 5,
                Price: 129,
            },
            //К.Клуб.
            {
                Product_ID: 6,
                Price: 129,
            },
            //К.С
            {
                Product_ID: 7,
                Price: 129,
            },
            //К.К
            {
                Product_ID: 8,
                Price: 129,
            },
            //Капучина
            {
                Product_ID: 9,
                Price: 179,
            },
            //Капучина карамел
            {
                Product_ID: 10,
                Price: 169,
            },
            //Кокосовый латте
            {
                Product_ID: 11,
                Price: 169,
            },
            //Американо
            {
                Product_ID: 12,
                Price: 119,
            },
            //Латте
            {
                Product_ID: 13,
                Price: 179,
            },
        ]
    })
}
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductCategories" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Carts" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItems" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Products" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItems" RESTART IDENTITY CASCADE`;

}
async function main() {
    try {
        await down();
        await up();
    }
    catch (e) {
        console.error(e);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
})