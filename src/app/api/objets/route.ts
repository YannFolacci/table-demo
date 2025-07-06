import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const serialNumber = searchParams.get('serialNumber')
  const reparationNumberId = searchParams.get('reparationNumber')
  const clientId = searchParams.get('client')
  const commandeId = searchParams.get('commande')
  const objectTypeId = searchParams.get('type')
  const conformity = searchParams.get('compliance')
  const mesuredAt = searchParams.get('date')

  const where: any = {}

  if (serialNumber) {
    where.serialNumber = {
      contains: serialNumber,
    }
  }

  // ReparationNumber filter construction
  const reparationNumberWhere: any = {}

  if (reparationNumberId && !isNaN(parseInt(reparationNumberId))) {
    reparationNumberWhere.id = parseInt(reparationNumberId)
  }

  if ((clientId && !isNaN(parseInt(clientId))) || (commandeId)) {
    reparationNumberWhere.commande = {}

    if (clientId ) {
      reparationNumberWhere.commande.client = {
        refNumber: clientId
      }
    }

    if (commandeId && !isNaN(parseInt(commandeId))) {
      reparationNumberWhere.commande.numero = commandeId
    }
  }

  if (objectTypeId) {
    reparationNumberWhere.type = {
      name: objectTypeId,
    };
  }

  if (Object.keys(reparationNumberWhere).length > 0) {
    where.reparationNumber = {
      is: reparationNumberWhere,
    }
  }

  // Mesure filters
  if (conformity !== null || mesuredAt) {
    where.mesure = {}

    if (conformity !== null) {
      where.mesure.conformity = conformity === 'true'
    }

    if (mesuredAt) {
      const date = new Date(mesuredAt)
      console.log('Date reçue:', mesuredAt, '→ Date JS:', date.toISOString())
      const start = new Date(new Date(mesuredAt).setHours(0, 0, 0, 0))
      const end = new Date(new Date(mesuredAt).setHours(23, 59, 59, 999))
      if (!isNaN(date.getTime())) {
        where.mesure.mesuredAt = { 
          gte: start,
          lte: end
         }
      }
    }
  }

  const objets = await prisma.objet.findMany({
    where,
    include: {
      reparationNumber: {
        include: {
          commande: {
            include: {
              client: true,
            },
          },
          type: true,
        },
      },
      mesure: true,
      certificat: true,
    },
  })

  return NextResponse.json(objets)
}
