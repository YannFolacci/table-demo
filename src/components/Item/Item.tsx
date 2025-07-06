"use client";

import React, { useState } from "react"; // ou seulement useState si tu en as besoin

export default function Item({ item, isSelected, onToggle }) {

    return (
            <tr className="item py-2 border-b border-gray-200">
                <td className="flex px-6 py-3 w-fit truncate"><input type="checkbox" checked={isSelected} onChange={onToggle} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"/></td>
                <td className="objectType px-6 py-3">{item.reparationNumber.type.name }</td>
                <td className="serialNumber px-6 py-3">{item.serialNumber }</td>
                <td className="reparationNumber px-6 py-3">{item.reparationNumber.id}</td>
                <td className="clientNumber px-6 py-3">{item.reparationNumber.commande.client.refNumber }</td>
                <td className="commandeNumber px-6 py-3">{item.reparationNumber.commande.numero }</td>
                <td className="date px-6 py-3">{item.mesure.mesuredAt }</td>
                <td className="resultat px-6 py-3">{item.mesure.compliance? "OK" : "NOK"}</td>
            </tr>
    )
}