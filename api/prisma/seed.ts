import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Veladoras y Sahumerios',
    slug: 'veladoras-sahumerios',
    description: 'Veladoras y sahumerios para rituales y aromaterapia',
  },
  {
    name: 'Tarot y Adivinación',
    slug: 'tarot-adivinacion',
    description: 'Mazos de tarot, cartas adivinatorias y herramientas esotéricas',
  },
  {
    name: 'Cristales y Piedras',
    slug: 'cristales-piedras',
    description: 'Cristales, piedras naturales y gemas curativas',
  },
  {
    name: 'Amuletos y Talismanes',
    slug: 'amuletos-talismanes',
    description: 'Amuletos protectores y talismanes de poder',
  },
  {
    name: 'Libros y Manuales',
    slug: 'libros-manuales',
    description: 'Libros de esoterismo, rituales y conocimiento oculto',
  },
]

const products = [
  // Veladoras y Sahumerios
  { name: 'Veladora Ritual Negra', slug: 'veladora-ritual-negra', description: 'Veladora de cera natural para rituales de protección', price: 5.99, categorySlug: 'veladoras-sahumerios', imageUrl: '' },
  { name: 'Sahumerio Palo Santo', slug: 'sahumerio-palo-santo', description: 'Pack de 5 sticks de palo santo para limpiar energías', price: 8.99, categorySlug: 'veladoras-sahumerios', imageUrl: '' },
  { name: 'Sahumerio Salvia Blanca', slug: 'sahumerio-salvia-blanca', description: 'Salvia blanca para limpieza energética', price: 7.99, categorySlug: 'veladoras-sahumerios', imageUrl: '' },
  { name: 'Veladora 7 Machos', slug: 'veladora-7-machos', description: 'Veladora 7 días para peticiones y abundancia', price: 12.99, categorySlug: 'veladoras-sahumerios', imageUrl: '' },
  { name: 'Sahumerio Mirra', slug: 'sahumerio-mirra', description: 'Sahumerio de mirra para meditación y protección', price: 9.99, categorySlug: 'veladoras-sahumerios', imageUrl: '' },

  // Tarot y Adivinación
  { name: 'Tarot Rider Waite', slug: 'tarot-rider-waite', description: 'El tarot Rider Waite clásico con guía incluido', price: 24.99, categorySlug: 'tarot-adivinacion', imageUrl: '' },
  { name: 'Cartas Oráculo', slug: 'cartas-oraculo', description: 'Oráculo de 64 cartas para adivinación daily', price: 18.99, categorySlug: 'tarot-adivinacion', imageUrl: '' },
  { name: 'Runas Vikingas', slug: 'runas-vikingas', description: 'Set de 24 piedras rúnicas con saquito de lino', price: 19.99, categorySlug: 'tarot-adivinacion', imageUrl: '' },
  { name: 'Tablero Ouija', slug: 'tablero-ouija', description: 'Tablero Ouija clásico con planchette', price: 29.99, categorySlug: 'tarot-adivinacion', imageUrl: '' },
  { name: 'Péndulo Cristal', slug: 'pendulo-cristal', description: 'Péndulo de cristal de roca con cadena', price: 15.99, categorySlug: 'tarot-adivinacion', imageUrl: '' },

  // Cristales y Piedras
  { name: 'Cuarzo Cristal', slug: 'cuarzo-cristal', description: 'Cuarzo cristal natural para meditación', price: 12.99, categorySlug: 'cristales-piedras', imageUrl: '' },
  { name: 'Amatista Geoda', slug: 'amatista-geoda', description: 'Geoda de amatista para limpieza de espacios', price: 34.99, categorySlug: 'cristales-piedras', imageUrl: '' },
  { name: 'Obsidiana Negra', slug: 'obsidiana-negra', description: 'Piedra negra de protección máxima', price: 9.99, categorySlug: 'cristales-piedras', imageUrl: '' },
  { name: 'Turmalina Negra', slug: 'turmalina-negra', description: 'Turmalina para protección y grounded', price: 11.99, categorySlug: 'cristales-piedras', imageUrl: '' },
  { name: 'Rodocrosita', slug: 'rodocrosita', description: 'Piedra del amor propio y sanación emocional', price: 14.99, categorySlug: 'cristales-piedras', imageUrl: '' },

  // Amuletos y Talismanes
  { name: 'Anillo Pentáculo', slug: 'anillo-pentaculo', description: 'Anillo de plata con pentáculo grabado', price: 22.99, categorySlug: 'amuletos-talismanes', imageUrl: '' },
  { name: 'Collar Ojo de Horacio', slug: 'collar-ojo-horacio', description: 'Collar con amuleto Ojo de Horacio', price: 18.99, categorySlug: 'amuletos-talismanes', imageUrl: '' },
  { name: 'Brazalete Chakra', slug: 'brazalete-chakra', description: 'Brazalete de 7 piedras chakras', price: 16.99, categorySlug: 'amuletos-talismanes', imageUrl: '' },
  { name: 'Medalla San Benito', slug: 'medalla-san-benito', description: 'Medalla de protección San Benito', price: 8.99, categorySlug: 'amuletos-talismanes', imageUrl: '' },
  { name: 'Llave de Salomón', slug: 'llave-salomon', description: 'Réplica de la llave del rey Salomón', price: 25.99, categorySlug: 'amuletos-talismanes', imageUrl: '' },

  // Libros y Manuales
  { name: 'Grimoire de Magia Negra', slug: 'grimoire-magia-negra', description: 'Manual completo de rituales y protecciones', price: 29.99, categorySlug: 'libros-manuales', imageUrl: '' },
  { name: 'Manual de Runas', slug: 'manual-runas', descripción: 'Guía completa para tirar y interpretar runas', price: 19.99, categorySlug: 'libros-manuales', imageUrl: '' },
  { name: 'Tarot para Principiantes', slug: 'tarot-principiantes', description: 'Aprende a leer el tarot desde cero', price: 22.99, categorySlug: 'libros-manuales', imageUrl: '' },
  { name: 'Herbario Mágico', slug: 'herbario-magico', description: 'Plantas y hierbas con propiedades místicas', price: 24.99, categorySlug: 'libros-manuales', imageUrl: '' },
  { name: 'Enciclopedia de Cristales', slug: 'enciclopedia-cristales', description: 'Guía completa de propiedades de cristales', price: 27.99, categorySlug: 'libros-manuales', imageUrl: '' },
]

async function main() {
  console.log('Starting seed...')

  // Create categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }
  console.log('Created categories')

  // Create products
  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug },
    })

    if (category) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl || null,
          categoryId: category.id,
        },
      })
    }
  }
  console.log('Created products')

  const categoryCount = await prisma.category.count()
  const productCount = await prisma.product.count()
  console.log(`Seeded ${categoryCount} categories and ${productCount} products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
