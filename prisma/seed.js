const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

function generateRefClient() {
  // Génère une chaîne de 6 chiffres aléatoires, avec padding
  return Math.floor(100000 + Math.random() * 900000);
}
function generateRNum() {
  // Génère une chaîne de 6 chiffres aléatoires, avec padding
  return `R${Math.random()*100}`;
}


async function main() {
  // Création des types d'objet
  const objectTypes = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.objectType.create({
        data: {
          name: faker.commerce.productMaterial(),
        },
      })
    )
  );

  // Création de clients
  for (let i = 0; i < 5; i++) {
    const client = await prisma.client.create({
      data: {
        name: faker.company.name(),
        refNumber: generateRefClient(),
      },
    });

    // Création de commandes pour chaque client
    for (let j = 0; j < 2; j++) {
      const commande = await prisma.commande.create({
        data: {
          numero: faker.string.uuid(),
          client: {
            connect: { id: client.id },
          },
        },
      });

      // Création de numéros de réparation liés à cette commande
      for (let k = 0; k < 2; k++) {
        const objectType = faker.helpers.arrayElement(objectTypes);

        const reparationNumber = await prisma.reparationNumber.create({
          data: {
            commande: {
              connect: { id: commande.id },
            },
            type: {
              connect: { id: objectType.id },
            },
          },
        });

        // Création d'objets associés à cette réparation
        for (let m = 0; m < 3; m++) {
          const objet = await prisma.objet.create({
            data: {
              serialNumber: faker.string.alphanumeric(12),
              reparationNumber: {
                connect: { id: reparationNumber.id },
              },
            },
          });

          // Ajoute une mesure
          await prisma.mesure.create({
            data: {
              compliance: faker.datatype.boolean(),
              mesuredAt: faker.date.recent(),
              objet: {
                connect: { id: objet.id },
              },
            },
          });

          // Ajoute un certificat
          await prisma.certificat.create({
            data: {
              objet: {
                connect: { id: objet.id },
              },
            },
          });
        }
      }
    }
  }
}

main()
  .then(() => {
    console.log('✅ Seed terminé !');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Erreur pendant le seed :', e);
    prisma.$disconnect();
    process.exit(1);
  });
