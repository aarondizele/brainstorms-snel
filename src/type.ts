export interface Invoice {
    id: string;
    dateReglementAuPlusTard: string;
    montant: number;
    dateEmission: string;
    indiceFacture: number;
    statusFactureId: string;
}