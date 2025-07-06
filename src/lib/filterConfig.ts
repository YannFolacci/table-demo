export const filterConfig = {
    type: {
        label: 'Type d’objet',
        model: 'objectType',
        field: 'name',
    },
    serialNumber: {
        label: 'Numéro de série',
        model: 'objet',
        field: 'serialNumber',
    },
    reparationNumber: {
        label: 'Numéro de réparation',
        model: 'reparationNumber',
        field: 'id',
    },
    client: {
        label: 'Code client',
        model: 'client',
        field: 'refNumber',
    },
    commande: {
        label: 'Commande',
        model: 'commande',
        field: 'numero',
    },
    date : {
        label: 'Date',
        model: 'mesure',
        field: 'mesuredAt',
    },
    compliance: {
        label: 'Résultat',
        model: 'mesure',
        field: 'compliance',
    },
};